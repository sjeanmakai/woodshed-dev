import { history } from "../helpers/history.js";
import { signupAlertActions } from "./signup_alert.actions";
import { loginAlertActions } from "./login_alert.actions";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../helpers/types.js";
import axios from "axios";
import { ReactSession } from "react-client-session";
import "regenerator-runtime/runtime";

export const signup = (name, email, password) => async (dispatch) => {
  try {
    dispatch(request({ name, email, password }));

    const res = await axios.post("http://localhost:8000/users", {
      name: name,
      email: email,
      password: password,
    });
    dispatch(success(res.data));
    // set user info in the session
    ReactSession.set("user", {
      user_email: res.data.email,
      user_name: res.data.name,
      user_id: res.data._id,
    });
    history.push("/");
  } catch (err) {
    dispatch(failure("User could not be created"));
    dispatch(
      signupAlertActions.error("User email might already exist, please try again.")
    );
    setTimeout(() => {
      dispatch(signupAlertActions.clear());
    }, 3000);
  }

  function request(payload) {
    return { type: SIGNUP_REQUEST, payload };
  }
  function success(payload) {
    return { type: SIGNUP_SUCCESS, payload };
  }
  function failure(error) {
    return { type: SIGNUP_FAILURE, error };
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(request({ email, password }));

    const res = await axios.post("http://localhost:8000/authenticate", {
      email: email,
      password: password,
    });
    dispatch(success(res.data));
    // set user info in the session
    ReactSession.set("user", {
      user_email: res.data.email,
      user_name: res.data.name,
      user_id: res.data._id,
    });
    history.push("/");
  } catch (err) {
    dispatch(failure("User could not be authenticated"));
    dispatch(loginAlertActions.error("Invalid credentials, try again"));
    setTimeout(() => {
      dispatch(loginAlertActions.clear());
    }, 3000);
  }

  function request(payload) {
    return { type: LOGIN_REQUEST, payload };
  }
  function success(payload) {
    return { type: LOGIN_SUCCESS, payload };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
};

export const logout = () => async (dispatch) => {
  // clear user info in the session
  ReactSession.set("user", {});
  history.push("/login");
};
