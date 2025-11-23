import { Navigate, Outlet } from "react-router-dom";
export  default function protectedroutse ()  {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/ar/login" replace />;
  }
  return <Outlet />;
};
