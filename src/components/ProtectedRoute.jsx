import { Navigate, Outlet, useLocation} from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import { useState, useContext, useLayoutEffect } from "react";

export default function ProtectedRoute() {
  const { accessToken,initializing  } =useContext(AuthContext);
  const location = useLocation();

  //  if (initializing) {
  //   return <div>Loading...</div>; 
  // }


  if (!accessToken) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

