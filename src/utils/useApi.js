import { useAuth } from "../context/AuthContext"

export const useApi = () => {
  const { accessToken, logout, api } = useAuth();

  const apiFetch = async (url, options = {}) => {
    try {
      const res = await api({
        url,
        method: options.method || "GET",
        data: options.data || {},
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        await logout();
        window.location.href = "/login";
      }
      throw err;
    }
  };

  return { apiFetch };
};


