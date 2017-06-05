import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { connect, } from 'react-redux';

import { AuthActs, } from '../../modules';

const LogoutLink = ({ logout, }) =>
  <FlatButton label="Logout" onClick={logout} />;

export default connect(null, AuthActs)(LogoutLink);
