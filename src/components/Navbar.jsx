import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          JobBoard
        </Link>
        <div className="nav-right">
          {!user ? (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/saved-jobs" className="nav-link">
                Saved Jobs
              </Link>
              <span className="user-email">{user.email}</span>
              <button className="logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
