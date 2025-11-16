import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../../css/LoginSignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);
  const { handleSignup, loading, error } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await handleSignup({
        email: formData.email,
        password: formData.password,
      });
      setSignupSuccess(true);
    } catch (err) {
      // Error is handled by AuthContext
    }
  };

  // Show verification message after successful signup
  if (signupSuccess) {
    return (
      <div className="signup-container">
        <div className="verification-card">
          <div style={{ textAlign: "center" }}>
            <h2>Check Your Email</h2>
            <p
              style={{
                color: "#6b7280",
                marginTop: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              We've sent a verification link to{" "}
              <strong>{formData.email}</strong>
            </p>
            <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
              Please check your email and click the verification link to
              activate your account.
            </p>
            <Link
              to="/login"
              className="auth-submit-btn"
              style={{ display: "inline-block", textDecoration: "none" }}
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Signup</h2>

        {(error || localError) && (
          <div className="error-message">{error || localError}</div>
        )}

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
      <p className="login-instead">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>
    </div>
  );
};

export default Signup;
