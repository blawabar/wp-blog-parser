import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { App } from "app";
import { configureStore } from "data/store";

import { Provider } from "react-redux";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
