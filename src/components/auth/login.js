import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import { bindActionCreators, } from 'redux';
import { connect, } from 'react-redux';
import { Field, reduxForm, } from 'redux-form';

// import { TextField, } from 'redux-form-material-ui';

// import { resetForm, } from '../../utils';
import { AuthActs, } from '../../modules';
import { ClearForm, renderText, } from '../../utils';

// import { AlertBar, } from '../stateful';

const baseLogin = ({ handleSubmit, }) => (
  <form onSubmit={handleSubmit} >
    <Field name="displayName" component={renderText} placeholder="displayName" />
    <FlatButton label="Login" primary type="submit" />
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
