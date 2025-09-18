import { useState, useContext } from "react";
import axios from 'axios';
import  {AuthContext}  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AdminDashboard() {

  const {logout} = useContext(AuthContext)
  const handleLogout = () => {
    logout()
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome Admin 🎉</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}


