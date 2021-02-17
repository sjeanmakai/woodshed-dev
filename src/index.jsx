import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import { store } from "./helpers/store.js";
import { history } from "./helpers/history.js";
import { App } from "./App/App";
import "./stylesheets/main.scss";

render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>,
  </Router>,
  document.getElementById("app")
);
