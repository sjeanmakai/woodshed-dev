import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../helpers/types";

export function signupReducer(state = {}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        signingUp: true,
        new_user: action.payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signedUp: true,
        new_user: action.payload,
      };
    case SIGNUP_FAILURE:
      return {};
    default:
      return state;
  }
}
