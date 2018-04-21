import Button from 'material-ui/Button';
import React from 'react';
import { connect } from 'react-redux';

import { Auth } from '../../modules';

const stateToProps = ({ auth: { user }}) => ({ user });

const LogoutLink = ({ logout, user }) =>
  user && <Button onClick={() => logout(user)}>Logout</Button>;

export default connect(stateToProps, Auth.actions)(LogoutLink);
