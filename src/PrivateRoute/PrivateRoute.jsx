import { Navigate, Outlet } from "react-router-dom";
import User from "../Gun/User";

export function PrivateRoute() {
  return User.get().is ? <Outlet /> : <Navigate to="login" replace />;
}
