import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../actions/user.actions.js";
import Alert from "./Alert";
import "../stylesheets/pages/_signup.scss";

const SignupPage = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alertReducer);
  const signingUp = useSelector((state) => state.signupReducer.signingUp);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

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
    if (name && email && password) {
      dispatch(signup(name, email, password));
    }
  };

  return (
    <div>
      <div className="signup-alert">
        {alert.message && <Alert type={alert.type} message={alert.message} />}
      </div>
      <div className="signup-form-container">
        <form name="form" onSubmit={(e) => handleSubmit(e)}>
          <div
            className={
              "form-component" + (submitted && !name ? " has-error" : "")
            }
          >
            <input
              type="text"
              autoComplete="nope"
              placeholder="name"
              className="signup-form-input"
              name="name"
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
            {submitted && !name && (
              <div className="help-block">Name is required</div>
            )}
          </div>
          <div
            className={
              "form-component" + (submitted && !email ? " has-error" : "")
            }
          >
            <input
              type="text"
              autoComplete="off"
              placeholder="email"
              className="signup-form-input"
              name="email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            {submitted && !email && (
              <div className="help-block">Email is required</div>
            )}
          </div>
          <div
            className={
              "form-component" + (submitted && !password ? " has-error" : "")
            }
          >
            <input
              type="password"
              placeholder="password"
              className="signup-form-input"
              name="password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
            {submitted && !password && (
              <div className="help-block">Password is required</div>
            )}
          </div>
          <div className="form-component">
            <button className="signup-btn">
              {signingUp ? "Signing up.." : "Sign up"}
            </button>
          </div>
        </form>
        <p>
          <Link className="signup-link" to="/login">
            Already have an account? Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
