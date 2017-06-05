import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators, } from 'redux';
import { connect, } from 'react-redux';
import { Field, reduxForm, } from 'redux-form';

// import { TextField, } from 'redux-form-material-ui';

// import { resetForm, } from '../../utils';
import { AuthActs, } from '../../modules';
import { ClearForm, renderText, } from '../../utils';
import LogoutLink from './logoutLink';

// import { AlertBar, } from '../stateful';

const baseLogin = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} >
    <Field name="displayName" component={renderText} placeholder="displayName" />
    <FlatButton label="Login" primary type="submit" />
    <LogoutLink/>
  </form>
);
const ReduxLogin = ClearForm(baseLogin);

const LoginForm = ({ login, formID, }) => (

    <ReduxLogin
      form={formID} onSubmit={login}
    />

);

export default connect(null, AuthActs)(LoginForm);
