import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

const AppContent = () => {
  const location = useLocation();
  const hideNavbar = [].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={hideNavbar ? {} : { paddingTop: "64px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/saved-jobs" element={<SavedJobsPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />}></Route>
        </Routes>
      </div>
    </>
  );
};

// Setting up the main structure of the app
// Any component insider the provider can access values.
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
