import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../Redux/store";

const RequireAuth: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return ((isLoggedIn)? <Outlet/> : <Navigate to={'/signin'}/>)
};

export default RequireAuth;
