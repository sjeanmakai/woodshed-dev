import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const verifyToken = require("../../middlewares/verifyToken");

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      verifyToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  location: PropTypes.string,
  component: PropTypes.object,
};
