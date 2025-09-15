import { useState, useContext } from "react";
import axios from 'axios';
import  {AuthContext}  from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth

  const {accessToken} = useContext(AuthContext);
  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
  //       { email, password }
  //     );

  //     console.log(res)
  //     const data = res.data;
  //     if (data) {
  //       localStorage.setItem("adminToken", data.token);
  //       window.location.href = "/";
  //     } else {
  //       alert(data.message);
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // redirect to dashboard/layout
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Login:</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}


