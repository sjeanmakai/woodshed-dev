import React, { useEffect, useReducer } from "react";
import { connect, useDispatch } from "react-redux";
import { PrivateRoute } from "../components/PrivateRoute";
import HomePage from "../components/HomePage";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import ManageSessions from "../components/ManageSessions";
import PlanSession from "../components/PlanSession";
import NavBar from "../components/NavBar";
import { logout } from "../actions/user.actions";
import { Route, Switch } from "react-router-dom";
import { ReactSession } from "react-client-session";

const App = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // clear user info from the session
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex" }}>
      <NavBar width={200} height={"100vh"}>
        <div className="woodshed-title-wrapper">
          <div className="woodshed-title">
            <div>Woodshed</div>
            <span className="title-text">purposeful practice</span>
          </div>
        </div>
        <div className="sidebar-menu-link-wrapper">
          <a className="sidebar-menu-link" href="/manageSessions">
            manage sessions
          </a>
        </div>
        <div className="sidebar-menu-link-wrapper">
          <a className="sidebar-menu-link" href="/planSession">
            plan session
          </a>
        </div>
        <div className="logout-link-wrapper">
          <a
            className="logout-link"
            href="/login"
            onClick={() => handleLogout()}
          >
            Logout
          </a>
        </div>
      </NavBar>
      <Switch>
        <PrivateRoute exact path="/" component={HomePage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/manageSessions" component={ManageSessions} />
        <Route path="/planSession" component={PlanSession} />
      </Switch>
    </div>
  );
};

const connectedApp = connect()(App);
export { connectedApp as App };
