import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { UserActs, } from '../modules';
import { auth, } from '../utils/firebase';

const mapStateToProps = ({ users, auth: { user, }, }) => ({ users, id: user && user.id, user, });
const Users = ({ users, addUser, id, user, }) => {
  console.log('user', user);
  return (
      <div className="App">
        <div className="App-header">
          <h1>the current user is { user && user.toJSON().displayName}</h1>
          <FlatButton label="add user" onClick={() => addUser('11')}/>

          <p>users</p>
          <ul>
            {users.map((u, i) => <p key={i}>{u.name}</p>)}
          </ul>
          <p>users</p>

        </div>
        <p className="App-intro" />
      </div>
  );
};

export default connect(mapStateToProps, UserActs)(Users);
