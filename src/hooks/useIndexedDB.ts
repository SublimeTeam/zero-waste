import { useEffect, useState } from "react";

const useIndexedDB = <T extends Record<string, unknown>>(
  dbName: string,
  storeName: string,
  onDBopen?: () => void
) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const openDB = () => {
      const request = indexedDB.open(dbName);

      request.onupgradeneeded = (event) => {
        const database = (event.target as IDBRequest).result as IDBDatabase;
        if (!database.objectStoreNames.contains(storeName)) {
          const objectStore = database.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
          objectStore.createIndex("email", "email", { unique: true });
        }
      };

      request.onsuccess = (event) => {
        setDb((event.target as IDBRequest).result as IDBDatabase);
      };

      request.onerror = (event) => {
        console.error("IndexedDB error:", (event.target as IDBRequest).error);
      };
    };

    openDB();
  }, [dbName, storeName]);

  useEffect(() => {
    if (db && onDBopen) {
      onDBopen();
    }
  }, [db]);

  const addData = (data: T): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database is not initialized"));
        return;
      }

      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  };

  const getDataCallback = (
    value: IDBValidKey | IDBKeyRange,
    key = "id",
    callback: (result: T | undefined) => void
  ): void => {
    if (!db) return;
    const transaction = db.transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const index = store.index(key); // Use the index on the email field
    const request = index.get(value);

    request.onsuccess = () => {
      callback(request.result as T | undefined);
    };

    request.onerror = (event) => {
      console.error("Get data error:", (event.target as IDBRequest).error);
    };
  };

  const getData = (
    value: IDBValidKey | IDBKeyRange,
    key = "id"
  ): Promise<T | undefined> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database is not initialized"));
        return;
      }

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const index = store.index(key); // Use the index on the email field
      const request = index.get(value);

      request.onsuccess = () => resolve((request.result as T) || undefined);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  };

  const getAllData = (): Promise<T[]> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database is not initialized"));
        return;
      }

      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  };

  const updateData = (id: number, updatedData: Partial<T>): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database is not initialized"));
        return;
      }

      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        const data = request.result as T;
        if (data) {
          const updatedItem = { ...data, ...updatedData };
          const updateRequest = store.put(updatedItem);

          updateRequest.onsuccess = () => resolve();
          updateRequest.onerror = (event) =>
            reject((event.target as IDBRequest).error);
        } else {
          resolve();
        }
      };

      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  };

  const deleteData = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error("Database is not initialized"));
        return;
      }

      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject((event.target as IDBRequest).error);
    });
  };

  return {
    addData,
    getData,
    getAllData,
    updateData,
    deleteData,
    getDataCallback,
  };
};

export default useIndexedDB;
