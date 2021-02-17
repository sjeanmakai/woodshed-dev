import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../helpers/types";
import { ReactSession } from "react-client-session";

let user = ReactSession.get("user");
const initialState = user ? { loggedIn: true, user } : {};

export function authenticationReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: false,
        authenticated_user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        authenticated_user: action.payload,
      };
    case LOGIN_FAILURE:
      return {};
    default:
      return state;
  }
}


