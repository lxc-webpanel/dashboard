import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import './Login.scss';

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

export const Login = (props) => {
  const { login, handleSubmit, pristine, submitting } = props;

  const handleFormSubmit = (values) => {
    const { username, password } = values;
    login(username, password);
  };

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
            <Field name='username' component={renderTextField} label='Username' fullWidth />
          </div>
          <div>
            <Field type='password' name='password' component={renderTextField} label='Password' fullWidth />
          </div>
          <div>
            <RaisedButton label='Login' primary type='submit' fullWidth style={{ marginTop: 15 }} disabled={pristine || submitting} />
          </div>
        </form>
      </Paper>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticating: PropTypes.bool.isRequired,
  statusText: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

renderTextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default Login;
