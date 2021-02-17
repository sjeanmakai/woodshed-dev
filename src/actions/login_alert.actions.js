import { LOGIN_ALERT_SUCCESS, LOGIN_ALERT_ERROR, LOGIN_ALERT_CLEAR } from "../helpers/types.js";

export const loginAlertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: LOGIN_ALERT_SUCCESS, message };
}

function error(message) {
  return { type: LOGIN_ALERT_ERROR, message };
}

function clear() {
  return { type: LOGIN_ALERT_CLEAR };
}
