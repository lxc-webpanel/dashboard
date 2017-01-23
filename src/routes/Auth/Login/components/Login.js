import React from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import './Login.scss';

export const Login = (props) => {
  const { login, handleSubmit, pristine, reset, submitting } = props;

  const handleFormSubmit = (values) => {
    const { username, password } = values;
    login(username, password);
  }

  const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextField hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  );

  const paperStyle = {
    textAlign: 'center',
    padding: '20px 20px 40px 20px',
    maxWidth: 320,
    margin: '0 auto'
  };

  return (
    <div>
      <Paper zDepth={1} style={paperStyle}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Field name='username' component={renderTextField} label='Username' fullWidth={true} />
          </div>
          <div>
            <Field type='password' name='password' component={renderTextField} label='Password' fullWidth={true} />
          </div>
          <div>
            <RaisedButton label='Login' primary type='submit' fullWidth={true} style={{ marginTop: 15 }} disabled={pristine || submitting} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  isAuthenticating: React.PropTypes.bool.isRequired,
  statusText: React.PropTypes.string
};

export default Login;
