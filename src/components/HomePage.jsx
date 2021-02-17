import React, { Component, useEffect } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import "../stylesheets/pages/_home.scss";
const verifyToken = require("../../middlewares/verifyToken");
import { ReactSession } from "react-client-session";

const HomePage = () => {
  const user = ReactSession.get("user");
  const dispatch = useDispatch();

  return (
    <div>
      {user.user_id ? (
        <div className="success-quote-wrapper">
          <div className="welcome-message">Welcome to woodshed</div>
          <div className="user-name">{user.user_name}</div>
          <div className="success-quote">
            "<span className="s1">Success</span> doesn’t come from what you do
            occasionally. It comes from{" "}
            <span className="s1">what you do consistently</span>." – Marie
            Forleo
          </div>
          <i class="fas fa-book" />
        </div>
      ) : (
        <div className="login-message">
          <div>
            Hmmm..it seems you are no longer logged in, click below to login
            again
          </div>
          <a href="/login">Login</a>
        </div>
      )}
    </div>
  );
};

export default HomePage;
