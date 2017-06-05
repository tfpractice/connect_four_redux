import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { UserActs, } from '../modules';
import { auth, } from '../utils/firebase';

const mapStateToProps = ({ users, auth: { user, }, }) => ({ users, id: user && user.id, });
const Users = ({ users, addUser, id, }) => (
      <div className="App">
        <div className="App-header">
          <h1>the current user ID is {id}</h1>
          <FlatButton label="add user" onClick={() => addUser('11')}/>
          
          <p>users</p>
          <ul>
            {users.map((u, i) => <p key={i}>user:{JSON.stringify(u)}</p>)}
          </ul>
          <p>users</p>

          </div>
        <p className="App-intro" />
      </div>
    );

export default connect(mapStateToProps, UserActs)(Users);
