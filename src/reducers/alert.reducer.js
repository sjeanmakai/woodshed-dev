import {
  LOGIN_ALERT_SUCCESS,
  LOGIN_ALERT_ERROR,
  LOGIN_ALERT_CLEAR,
  SIGNUP_ALERT_SUCCESS,
  SIGNUP_ALERT_ERROR,
  SIGNUP_ALERT_CLEAR,
  PLAN_ALERT_SUCCESS,
  PLAN_ALERT_ERROR,
  PLAN_ALERT_CLEAR,
  UPDATE_ALERT_SUCCESS,
  UPDATE_ALERT_ERROR,
  UPDATE_ALERT_CLEAR,
} from "../helpers/types";

export function alertReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_ALERT_SUCCESS:
      return {
        ...state,
        type: "alert-success-login",
        message: action.message,
      };
    case LOGIN_ALERT_ERROR:
      return {
        ...state,
        type: "alert-danger-login",
        message: action.message,
      };
    case LOGIN_ALERT_CLEAR:
      return {};
    case SIGNUP_ALERT_SUCCESS:
      return {
        ...state,
        type: "alert-success-signup",
        message: action.message,
      };
    case SIGNUP_ALERT_ERROR:
      return {
        ...state,
        type: "alert-danger-signup",
        message: action.message,
      };
    case SIGNUP_ALERT_CLEAR:
      return {};
    case PLAN_ALERT_SUCCESS:
      return {
        ...state,
        type: "alert-success-plan",
        message: action.message,
      };
    case PLAN_ALERT_ERROR:
      return {
        ...state,
        type: "alert-danger-plan",
        message: action.message,
      };
    case PLAN_ALERT_CLEAR:
      return {};
    case UPDATE_ALERT_SUCCESS:
      return {
        ...state,
        type: "alert-success-update",
        message: action.message,
      };
    case UPDATE_ALERT_ERROR:
      return {
        ...state,
        type: "alert-danger-update",
        message: action.message,
      };
    case UPDATE_ALERT_CLEAR:
      return {};
    default:
      return state;
  }
}
