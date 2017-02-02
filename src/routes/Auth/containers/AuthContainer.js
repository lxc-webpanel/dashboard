import { connect } from 'react-redux';
import { logUserIn } from '../../../store/auth';
import { reduxForm } from 'redux-form';
import Auth from '../components/Auth';

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
  logUserIn
};

const mapStateToProps = (state) => ({
  isAuthenticating: state.auth.isAuthenticating,
  statusText: state.auth.statusText
});

const AuthWithForm = reduxForm({
  form: 'auth',
  validate
})(Auth);

export default connect(mapStateToProps, mapDispatchToProps)(AuthWithForm);
