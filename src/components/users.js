import React from 'react';
import { connect, } from 'react-redux';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { UserActs, } from '../modules';

const mapStateToProps = ({ users, auth: { user, }, }) => ({ users, id: user && user.id, });

const Users = ({ users, addUser, id, }) => (
      <Grid container direction="column" justify="center" align="center" className="App">
        <Grid item xs={11} className="App-header">
          <h1>the current user ID is {id}</h1>
          <Button onClick={() => addUser('11')}>Add User</Button>

          <p>users</p>
          <ul>
            {users.map((u, i) => <p key={i}>user:{JSON.stringify(u)}</p>)}
          </ul>
          <p>users</p>

        </Grid>
      </Grid>
    );

export default connect(mapStateToProps, UserActs)(Users);
