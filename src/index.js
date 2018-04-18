import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider } from "react-redux";

import "./index.css";

import getStore from "./store";
import Home from "./components";
import {
  authHandler,
  connHandler,
  gameHandler,
  onlineHandler,
} from "./handlers";
import { theme } from "./utils";

const store = getStore();

authHandler(store);
connHandler(store);
gameHandler(store);
onlineHandler(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`root`)
);
