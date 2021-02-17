import { combineReducers } from "redux";

import { authenticationReducer } from "./authentication.reducer";
import { signupReducer } from "./signup.reducer";
import { sessionReducer } from "./session.reducer";
import { alertReducer } from "./alert.reducer";

const rootReducer = combineReducers({
  authenticationReducer,
  signupReducer,
  sessionReducer,
  alertReducer,
});

export default rootReducer;
