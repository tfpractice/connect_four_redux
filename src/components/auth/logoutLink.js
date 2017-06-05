import React from 'react';
import Button from 'material-ui/Button';
import { connect, } from 'react-redux';

import { AuthActs, } from '../../modules';

const LogoutLink = ({ logout, }) =>
  <Button label="Logout" onClick={logout} />;

export default connect(null, AuthActs)(LogoutLink);
