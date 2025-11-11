// Allow users to login, if not direct them to the signup page
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../css/LoginSignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { handleSignup, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("attempting to signup with: ", formData);
    try {
      await handleSignup({
        email: formData.email,
        password: formData.password,
      });
      alert("Signup Successful");
      navigate("/");
    } catch (err) {
      console.log("Signup failed: ", err.message);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Signup</h2>

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
          placeholder="Create a password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confirmPassword" className="password">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button className="auth-submit-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
