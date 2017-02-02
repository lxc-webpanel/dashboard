import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import TextField from '../../../components/Form/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export const AuthForm = (props) => {
  const { handleFormSubmit, pristine, submitting } = props;

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <Field name='username' component={TextField} label='Username' fullWidth />
      </div>
      <div>
        <Field type='password' name='password' component={TextField} label='Password' fullWidth />
      </div>
      <div>
        <RaisedButton label='Login' primary type='submit' fullWidth style={{ marginTop: 15 }} disabled={pristine || submitting} />
      </div>
    </form>
  );
};

AuthForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
};

export default AuthForm;
