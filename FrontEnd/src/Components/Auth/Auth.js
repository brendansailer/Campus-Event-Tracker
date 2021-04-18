import "./Auth.css";
import AuthLogin from "./AuthLogin/AuthLogin";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "../../Common/Services/AuthService";

const Auth = () => {
  let history = useHistory();
  var currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      history.push("/home-auth");
    }
  }, [currentUser, history]);

  return (
    <div className="auth-page">
      <div className="auth-center-container">
        <div className="login-container">
          <AuthLogin />
        </div>
        <div
          style={{ marginLeft: "10px", fontSize: "small" }}
          className="register-redirect"
        >
          <p>Don't have an account?</p>
          <Link to="/register">
            <p style={{ marginLeft: "5px" }}>Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
