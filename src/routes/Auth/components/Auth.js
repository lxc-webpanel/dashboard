import React, { PropTypes } from 'react';
import Paper from 'material-ui/Paper';
import AuthForm from './AuthForm';
import './Auth.scss';

const paperStyle = {
  textAlign: 'center',
  padding: '20px 20px 40px 20px',
  maxWidth: 320,
  margin: '0 auto'
};

export const Auth = (props) => {
  const { logUserIn, handleSubmit } = props;

  const handleFormSubmit = (values) => {
    const { username, password } = values;

    logUserIn(username, password);
  };

  return (
    <Paper zDepth={1} style={paperStyle}>
      <AuthForm {...props} handleFormSubmit={handleSubmit(handleFormSubmit)} />
    </Paper>
  );
};

Auth.propTypes = {
  logUserIn: PropTypes.func.isRequired,

  isAuthenticating: PropTypes.bool.isRequired,
  statusText: PropTypes.string,

  handleSubmit: PropTypes.func.isRequired
};

export default Auth;
