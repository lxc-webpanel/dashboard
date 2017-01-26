import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import LoginForm from './LoginForm';
import './Login.scss';

const paperStyle = {
  textAlign: 'center',
  padding: '20px 20px 40px 20px',
  maxWidth: 320,
  margin: '0 auto'
};

export const Login = (props) => {
  const { logUserIn, handleSubmit } = props;

  const handleFormSubmit = (values) => {
    const { username, password } = values;

    logUserIn(username, password);
  };

  return (
    <Paper zDepth={1} style={paperStyle}>
      <LoginForm {...props} handleFormSubmit={handleSubmit(handleFormSubmit)} />
    </Paper>
  );
};

Login.propTypes = {
  logUserIn: PropTypes.func.isRequired,

  isAuthenticating: PropTypes.bool.isRequired,
  statusText: PropTypes.string,

  handleSubmit: PropTypes.func.isRequired
};

export default Login;
