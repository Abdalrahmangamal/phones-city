import { Navigate, Outlet } from "react-router-dom";
export  default function protectedroutse ()  {
  const token = localStorage.getItem("token");
  const firstSegment = window.location.pathname.split("/").filter(Boolean)[0];
  const lang = firstSegment === "en" ? "en" : "ar";
  if (!token) {
    return <Navigate to={`/${lang}/login`} replace />;
  }
  return <Outlet />;
};
