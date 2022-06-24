import Signup from "./Components/SignUp/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Components/ForgotPassword";
import UpdateProfile from "./Components/UpdateProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/update-profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
