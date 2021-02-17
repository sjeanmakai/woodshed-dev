import { UPDATE_ALERT_SUCCESS, UPDATE_ALERT_ERROR, UPDATE_ALERT_CLEAR } from "../helpers/types.js";

export const updateAlertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: UPDATE_ALERT_SUCCESS, message };
}

function error(message) {
  return { type: UPDATE_ALERT_ERROR, message };
}

function clear() {
  return { type: UPDATE_ALERT_CLEAR };
}