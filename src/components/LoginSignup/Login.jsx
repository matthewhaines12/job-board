// Allow users to login, if not direct them to the signup page
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../css/LoginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { handleLogin, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("attempting to login with: ", formData);
    try {
      await handleLogin({
        email: formData.email,
        password: formData.password,
      });
      alert("Login Successful");
      navigate("/");
    } catch (err) {
      console.log("Login failed:", err);
    }
    // send to backend
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <label htmlFor="email" className="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password" className="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <button className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
