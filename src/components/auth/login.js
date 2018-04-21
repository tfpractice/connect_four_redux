import Button from 'material-ui/Button';
import React from 'react';
import { connect } from 'react-redux';
import { Field } from 'redux-form';

import LogoutLink from './logoutLink';
import { Auth } from '../../modules';
import { ClearForm, renderText } from '../../utils';

const baseLogin = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Field
      name="displayName"
      component={renderText}
      placeholder="displayName"
    />
    <Button type="submit">Login</Button>
    <LogoutLink />
  </form>
);

const ReduxLogin = ClearForm(baseLogin);

const LoginForm = ({ login, formID }) => (
  <ReduxLogin form={formID} onSubmit={login} />
);

export default connect(null, Auth.actions)(LoginForm);
