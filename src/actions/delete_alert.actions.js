import { DELETE_ALERT_SUCCESS, DELETE_ALERT_ERROR, DELETE_ALERT_CLEAR } from "../helpers/types.js";

export const deleteAlertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: DELETE_ALERT_SUCCESS, message };
}

function error(message) {
  return { type: DELETE_ALERT_ERROR, message };
}

function clear() {
  return { type: DELETE_ALERT_CLEAR };
}