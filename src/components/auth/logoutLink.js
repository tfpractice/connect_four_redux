import React from 'react';
import Button from 'material-ui/Button';
import { connect, } from 'react-redux';

import { AuthActs, } from '../../modules';

const LogoutLink = ({ logout, }) =>
  <Button onClick={logout} >Logout</Button>;

export default connect(null, AuthActs)(LogoutLink);
