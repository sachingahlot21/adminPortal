import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function PublicOnlyRoute({ children }) {
  const { accessToken } = useContext(AuthContext);

  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
}
