import Signup from "./Pages/SignUp/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/Login/VerifyEmail";
import student from "./routes/student";
import admin from "./routes/admin";
import tpo from "./routes/tpo";
import ProfileForm from "./Pages/Profile Form/ProfileForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/verify-email" element={<VerifyEmail />} />
          <Route exact path="/testing" element={<ProfileForm />} />
          <Route element={<PrivateRoute role={""} />}>
            <Route exact path="/" element={<></>} />
          </Route>
          {student()}
          {admin()}
          {tpo()}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
