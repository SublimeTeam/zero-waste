import useIndexedDB from "./useIndexedDB";
import { User, UserOrder } from "@/types/User";

export const defaultUser = {
  cep: "18901190",
  city: "Assis",
  cpf: "000.000.000-00",
  district: "Rua da Fiap",
  email: "leandro@fiap.com",
  password: "1",
  state: "SP",
  street: "José de Alencar",
  username: "Leandro de Lima",
};

export const useUsers = () => {
  const { addData, getData, updateData, getDataCallback } = useIndexedDB<User>(
    "ZeroWaste",
    "Users",
    () => createUser(defaultUser)
  );

  const createUser = async (user: User) => {
    try {
      await addData({ ...user, orders: [] });
    } catch (e) {
      if ((e as Error).name === "ConstraintError") {
        console.log("email já cadastrado");
      }
      throw e;
    }
  };

  const getUserByEmail = async (email: User["email"]) => {
    const user = await getData(email, "email");

    console.log({ user });
    return user;
  };

  const updateUser = async (user: User) => {
    if (!user.id) {
      throw new Error("id não encontrado");
    }

    await updateData(user.id, user);
  };

  const makeOrder = async (userId: string, order: UserOrder) => {
    const user = await getUserByEmail(userId);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    user.orders = [...(user.orders || []), order];

    await updateUser(user);
  };

  const updateOrder = async (userEmail: string, order: UserOrder) => {
    const user = await getUserByEmail(userEmail);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    user.orders = user.orders?.map((oldOrder) =>
      oldOrder.id === order.id ? order : oldOrder
    );

    await updateUser(user);
  };

  return {
    createUser,
    getUserByEmail,
    makeOrder,
    getDataCallback,
    updateOrder,
  };
};
