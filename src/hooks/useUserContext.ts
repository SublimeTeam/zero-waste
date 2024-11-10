import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser deve ser usado dentro de um UserContextProvider");
  }

  return context;
};
