import React from 'react';
import './AuthLayout.scss';
import '../../styles/core.scss';
import Logo from '../../../public/logo.svg';

export const AuthLayout = ({ children }) => (
  <div className='layout auth-layout text-center valign'>
    <div className='valign-child'>
      <img className='logo' src={Logo} />
      <div>
        {children}
      </div>
    </div>
  </div>
);

AuthLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default AuthLayout;
