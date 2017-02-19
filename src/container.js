import React, { Component, } from 'react';
import { Provider, } from 'react-redux';
import { BrowserRouter, Link, Route, Switch, } from 'react-router-dom';
import getRoutes from './routes';

export default class AppContainer extends Component {
  render() {
    const { store, history, } = this.props;

    return (
      <Provider store={store}>
        <BrowserRouter>

          {/* <Router routes={getRoutes(store)} history={history} /> */}
        </BrowserRouter>
      </Provider>
    );
  }
}
