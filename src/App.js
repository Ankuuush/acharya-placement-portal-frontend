import Signup from "./Pages/SignUp/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/Login/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Student from "./routes/Student";
import Admin from "./routes/Admin";
import Tpo from "./routes/Tpo";
import './index.css'
function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route element={<PrivateRoute role={""} />}>
            <Route exact path="/" element={<></>} />
          </Route>
          {Student()}
          {Admin()}
          {Tpo()}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
