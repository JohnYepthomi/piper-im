import { Navigate, Outlet } from "react-router-dom";
import User from "../Gun/User";
import { useState } from "react";

export function PrivateRoute() {
  const [user] = useState(User.get());

  if (user && user.is) return <Outlet />;
  else return <Navigate to="login" replace />;
}
