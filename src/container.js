import React, { Component, } from 'react';
import { Provider, } from 'react-redux';
import { Router, } from 'react-router';
import getRoutes from './routes';

export default class AppContainer extends Component {
  render() {
    const { store, history, } = this.props;

    return (
      <Provider store={store}>
        <Router routes={getRoutes(store)} history={history} />
      </Provider>
    );
  }
}
