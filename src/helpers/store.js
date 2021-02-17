import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";
import { ReactSession } from "react-client-session";
ReactSession.setStoreType("localStorage");

const loggerMiddleware = createLogger();

// IF check is confirming if the extension is installed or not
let composeEnhancer = compose;
if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {

  composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  });

}

export const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunkMiddleware, loggerMiddleware))
);

