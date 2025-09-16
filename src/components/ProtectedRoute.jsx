import { Navigate, Outlet } from "react-router-dom";
import {AuthContext} from '../context/AuthContext'
import { useState, useContext } from "react";

export default function ProtectedRoute() {
  const { accessToken,initializing  } =useContext(AuthContext);

   if (initializing) {
    return <div>Loading...</div>; // spinner or null
  }


  if (!accessToken) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

