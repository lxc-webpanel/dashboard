import React, { PropTypes } from 'react';
import MuiTextField from 'material-ui/TextField';

export const TextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <MuiTextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
);

TextField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired
};

export default TextField;
