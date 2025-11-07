import { useState } from "react";
import { signup, login } from "../services/apiAuth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signup(userData);
      localStorage.setItem("authToken", data.token);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const data = await login(credentials);
      localStorage.setItem("authToken", data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return {
    handleSignup,
    handleLogin,
    handleLogout,
    loading,
    user,
    error,
  };
}
