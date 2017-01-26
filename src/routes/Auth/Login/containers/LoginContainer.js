import { connect } from 'react-redux';
import { loginUser } from '../../../../store/auth';
import { reduxForm } from 'redux-form';
import Login from '../components/Login';

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.password) {
    errors.email = 'Required';
  }

  return errors;
};

const mapDispatchToProps = {
  logUserIn: loginUser
};

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const LoginWithForm = reduxForm({
  form: 'login',
  validate
})(Login);

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithForm);
