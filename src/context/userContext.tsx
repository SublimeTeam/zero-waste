import { User } from "@/types/User";
import { createContext, ReactNode, useState } from "react";

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

const getUserFromLocalstorage = () => {
  const userFromStorage = localStorage.getItem("user");

  if (userFromStorage) {
    return JSON.parse(userFromStorage);
  }

  return null;
};

export const UserContextProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(getUserFromLocalstorage);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user)); // Save user in localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <UserContext.Provider value={{ logout, login, user }}>
      {children}
    </UserContext.Provider>
  );
};
