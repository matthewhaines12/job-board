// Share auth context throughout application
import { createContext, useState, useContext, useEffect } from "react";
import { signup, login, refresh, logout } from "../services/apiAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const data = await refresh();
        setAccessToken(data.accessToken);
        setUser(data.user);
      } catch (err) {
        console.log("No valid refresh token");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signup(userData);
      setAccessToken(data.accessToken);
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
      setAccessToken(data.accessToken);
      setUser(data.user);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // const handleRefresh = async () => {
  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const data = await refresh();
  //     setAccessToken(data.accessToken);
  //   } catch (err) {
  //     setError(err.message);
  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLogout = async () => {
    setAccessToken(null);
    setUser(null);

    await logout();
  };

  // Shared values *** look into useMemo later ***
  const value = {
    user,
    accessToken,
    loading,
    error,
    handleSignup,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within the AuthProvider");

  return context;
};

export { AuthProvider, useAuth, refresh };
