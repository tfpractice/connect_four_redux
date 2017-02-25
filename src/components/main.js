import React, { Component, } from 'react';

import Users from './users';

const Main = ({ users, }) => (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Connect Four Redux</h2>
          <Users/>
          <p className="App-intro" />
        </div>
      </div>
    );

export default Main;
