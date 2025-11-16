import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmail } from "../services/apiAuth";
import LoadingState from "../components/shared/LoadingState";
import ErrorState from "../components/shared/ErrorState";
import "../css/LoginSignup.css";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const emailToken = searchParams.get("token");

      if (!emailToken) {
        setError("Verification token is missing");
        setLoading(false);
        return;
      }

      try {
        await verifyEmail(emailToken);
        setSuccess(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        console.error("Verification error:", err);
        setError(err.message || "Verification failed");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="verify-email-container">
        <LoadingState message="Verifying your email..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="verify-email-container">
        <div className="verification-card">
          <ErrorState message="Verification Failed" suggestion={error} />
          <button
            className="auth-submit-btn"
            onClick={() => navigate("/login")}
            style={{ marginTop: "1rem" }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="verify-email-container">
        <div className="verification-card">
          <div style={{ textAlign: "center" }}>
            <h2>Email Verified Successfully!</h2>
            <p style={{ color: "#6b7280", marginTop: "0.5rem" }}>
              Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default VerifyEmailPage;
