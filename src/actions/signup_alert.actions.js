import { SIGNUP_ALERT_SUCCESS, SIGNUP_ALERT_ERROR, SIGNUP_ALERT_CLEAR } from "../helpers/types.js";

export const signupAlertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: SIGNUP_ALERT_SUCCESS, message };
}

function error(message) {
  return { type: SIGNUP_ALERT_ERROR, message };
}

function clear() {
  return { type: SIGNUP_ALERT_CLEAR };
}