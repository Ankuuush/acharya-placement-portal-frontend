import React, { useContext, useState, useEffect } from "react";
import { Button, Container, TextField } from "@mui/material";
import { Link, useLocation, useNavigate , useSearchParams} from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "../../Styles/LoginSignUp.css";
import jwt_decode from "jwt-decode";
import taxi from "../../Assets/taxi.png";
import { toast } from "react-toastify";
import PlacementLogo from "../../Components/Logo/PlacementLogo";
import constants from "../../Constants";
import Spinner from "../../Components/Spinner/Spinner";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const authContext = useContext(AuthContext);
  const { login, logout } = authContext;
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const from = location.state?.from?.pathname || searchParams.get("redirect") || "/";
  const [random_quote] = useState(constants.RANDOM_QUOTE());

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await login(credentials.email, credentials.password);
      console.log(response);
      const token = jwt_decode(String(response.user.accessToken));
      if (token.email_verified) {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      } else {
        await logout();
        navigate("/verify-email");
      }
    } catch {
      toast.error("Invalid/Expired Credentials", {
        position: 'bottom-center',
        theme: "colored"
      });
    }
    setLoading(false);
  };

  return (
    <div id="login-signup-container">
      <div id="right-component">
        <div className="quote-component">
        <h3>{random_quote.text}</h3>
          <p>-{random_quote.author}</p>
        </div>
        <img src={taxi} alt="taxi" height={520} className="display-vector" />
      </div>
      <div id="left-component">
        <Container style={{ width: "90%", margin: 0, padding: "20px 20px" }}>
          <PlacementLogo />
          <div className="login-form">
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h4 className="login-header">Universal Login</h4>
              <TextField
                name="email"
                onChange={onChange}
                value={credentials.email}
                size="normal"
                label="Email"
                variant="outlined"
                type="email"
                style={{
                  width: "100%",
                  margin: "0.35rem 0",
                  marginBottom: "1.5rem",
                }}
                required
              />
              <TextField
                name="password"
                onChange={onChange}
                value={credentials.password}
                size="normal"
                label="Password"
                type="password"
                variant="outlined"
                style={{ width: "100%", margin: "0.35rem 0" }}
                required
              />

              <div style={{display: "flex",alignItems: "center", textAlign: "center", verticalAlign: "center"}}>
              <button
                disabled={loading}
                size="large"
                variant="contained"
                color="warning"
                type="submit"
                style={{
                  width: "60%",
                  marginTop: "1.5rem",
                  marginBottom: "0.5rem",
                  border: "none",
                  padding: "1rem 2rem",
                  borderRadius: 5,
                  fontSize: 20,
                  backgroundColor: "#f1922e",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
              {loading && <Spinner />}
              </div>
            </form>
            <div className="prompts">
            <p className="prompt-tags">
              Lost your password?{" "}
              <Link
                to="/forgot-password"
                style={{ color: "#4A75B5", textDecoration: "none" }}
              >
                Reset Here.
              </Link>
            </p>
            {/* <p className="prompt-tags">
              New student?{" "}
              <Link
                to="/signup"
                style={{ color: "#4A75B5", textDecoration: "none" }}
              >
                Register Here.
              </Link>
            </p> */}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Login;
