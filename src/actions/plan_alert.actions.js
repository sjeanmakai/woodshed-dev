import { PLAN_ALERT_SUCCESS, PLAN_ALERT_ERROR, PLAN_ALERT_CLEAR } from "../helpers/types.js";

export const planAlertActions = {
  success,
  error,
  clear,
};

function success(message) {
  return { type: PLAN_ALERT_SUCCESS, message };
}

function error(message) {
  return { type: PLAN_ALERT_ERROR, message };
}

function clear() {
  return { type: PLAN_ALERT_CLEAR };
}