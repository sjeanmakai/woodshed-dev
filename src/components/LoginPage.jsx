import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/user.actions.js";
import Alert from "./Alert";
import "../stylesheets/pages/_login.scss";

const LoginPage = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  const loggingIn = useSelector((state) => state.authenticationReducer.loggingIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (email && password) {
      dispatch(login(email, password));
    }
  };

  return (
    <div>
      <div className="login-alert">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
      </div>
      <div className="login-form-container">
        <form name="form" onSubmit={(e) => handleSubmit(e)}>
          <div
            className={
              "form-component" + (submitted && !email ? " has-error" : "")
            }
          >
            <input
              type="text"
              autoComplete="off"
              placeholder="email"
              className="login-form-input"
              name="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </div>
          {submitted && !email && (
            <div className="help-block">Email is required</div>
          )}
          <div
            className={
              "form-component" + (submitted && !password ? " has-error" : "")
            }
          >
            <input
              type="password"
              placeholder="password"
              className="login-form-input"
              name="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </div>
          {submitted && !password && (
            <div className="help-block">Password is required</div>
          )}
          <div className="form-component">
            <button className="login-btn">
              {loggingIn ? "Logging in.." : "Login"}
            </button>
          </div>
        </form>
        <p>
          <Link className="login-link" to="/signup">
            No account? Click to create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
