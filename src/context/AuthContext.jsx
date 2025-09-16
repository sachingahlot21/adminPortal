import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

export const AuthContext = React.createContext()

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);


  const accessTokenRef = useRef(null);
  const refreshPromiseRef = useRef(null);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  // Attach interceptors once
  useEffect(() => {
    // Request interceptor: attach Authorization if available
    const reqI = api.interceptors.request.use(config => {
      const token = accessTokenRef.current;
      if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      return config;
    }, err => Promise.reject(err));

    // Response interceptor: on 401 try refresh -> retry original request
    const resI = api.interceptors.response.use(
      res => res,
      async error => {
        const originalRequest = error.config;
        if (!originalRequest) return Promise.reject(error);

        // avoid infinite loops
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // If a refresh is already in progress, reuse its promise
            if (!refreshPromiseRef.current) {
              refreshPromiseRef.current = api.post("/api/auth/refresh")
                .then(r => {
                  const newToken = r.data.accessToken;
                  setAccessToken(newToken);
                  refreshPromiseRef.current = null;
                  return newToken;
                })
                .catch(err => {
                  refreshPromiseRef.current = null;
                  throw err;
                });
            }

            const newToken = await refreshPromiseRef.current;
            // set header and retry
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          } catch (e) {
            // refresh failed -> clear auth and optionally redirect
            setAccessToken(null);
            setUser(null);
            return Promise.reject(e);
          }
        }

        return Promise.reject(error);
      }
    );

    // cleanup on unmount
    return () => {
      api.interceptors.request.eject(reqI);
      api.interceptors.response.eject(resI);
    };
  }, []); // run once

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await api.post("/admin/refresh");
        setAccessToken(res.data.accessToken);
      } 
      catch (err) {
        console.log("No refresh token or invalid.");
      }
      finally {
        setInitializing(false);
      }
    };
    refreshToken();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/admin/login", { email, password });
    console.log(res.data);
    setAccessToken(res.data.accessToken);
    setUser(res.data.admin);
    return res.data.admin;
  };


  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch (err) {
      console.log("error occured!" , err)
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout, api,initializing  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider


