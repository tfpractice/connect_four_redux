import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider } from "material-ui/styles";
import { Provider } from "react-redux";
import { render } from "react-dom";

import "./index.css";
import getStore from "../store";
import Home from "../components";
import { fireBase, theme } from "../utils";

// import { theme } from "./utils";

const { applyHandlers } = fireBase;

const store = applyHandlers(getStore());

window.getState = store.getState;
render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route component={Home} />
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById(`root`)
);
