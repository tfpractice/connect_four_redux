import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { UserActs, } from '../modules';

const mapStateToProps = ({ users, }) => ({ users, });
const Users = ({ users, addUser, }) => (
      <div className="App">
        <div className="App-header">
          <FlatButton label="add user" onClick={() => addUser('11')}/>
          <p>users</p>
          <ul>
            {users.map((u, i) => <p key={i}>{u.toString()}</p>)}
          </ul>

          </div>
        <p className="App-intro" />
      </div>
    );

export default connect(mapStateToProps, UserActs)(Users);
