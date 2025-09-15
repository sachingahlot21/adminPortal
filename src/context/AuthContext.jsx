import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = React.createContext()

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, 
});

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await api.post("/api/auth/refresh");
        setAccessToken(res.data.accessToken);
      } catch (err) {
        console.log("No refresh token or invalid.");
      }
    };
    refreshToken();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    await api.post("/api/auth/logout");
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider


