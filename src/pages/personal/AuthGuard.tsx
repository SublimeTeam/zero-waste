import { useUserContext } from "@/hooks/useUserContext";
import { Navigate, Outlet } from "react-router-dom";

export const AuthGuard = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};
