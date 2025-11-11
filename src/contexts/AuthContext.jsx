// Share auth context throughout application
import { createContext, useState, useEffect, useContext } from "react";
import { signup, login } from "../services/apiAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  //   const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     // Check if user is logged in on mount
  //     const token = localStorage.getItem("authToken");
  //     // const user = localStorage.getItem()

  //     if (token) {
  //       console.log("user is loggd in on mount");
  //     }
  //   }, []);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const data = await signup(userData);
      console.log("Signup Successful:", data);

      // setUser(data.user);

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
      console.log("Login Successful:", data);
      //   localStorage.setItem("authToken", data.token);
      //   setUser(data.user);
      //   if (saved) setSavedJobs(JSON.parse(saved));

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    handleSignup,
    handleLogin,
  };

  return <AuthContext value={value}>{children}</AuthContext>;
};

export { AuthProvider, AuthContext };
