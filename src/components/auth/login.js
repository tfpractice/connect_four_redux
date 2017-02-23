import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators, } from 'redux';
import { connect, } from 'react-redux';
import { Field, reduxForm, } from 'redux-form';
import { TextField, } from 'redux-form-material-ui';
import { resetForm, } from '../../utils';
import { AuthActs, } from '../../modules';

// import { AlertBar, } from '../stateful';

const baseLogin = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} >
    {/* <Field name="username" component={TextField} placeholder="username" type="text" />
    <Field name="password" component={TextField} placeholder="password" type="password" /> */}
    <FlatButton label="Login" primary type="submit" />
    {/* <AlertBar message={'you logged in'} /> */}
  </form>
);
const ReduxLogin = reduxForm()(baseLogin);

const LoginForm = ({ login, formID, }) => (
  <div className="row">
    <p>Login</p>
    <ReduxLogin
      form={formID} onSubmit={login} onSubmitSuccess={resetForm(formID)}
    />
  </div>
);

export default connect(null, AuthActs)(LoginForm);
