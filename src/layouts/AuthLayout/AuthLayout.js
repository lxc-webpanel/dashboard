import React from 'react';
import Header from '../../components/Header';
import './AuthLayout.scss';
import '../../styles/core.scss';
import Logo from '../../../public/logo.svg';
import Notification from '../../components/Notification';

export const AuthLayout = ({ children }) => (
  <div className='layout auth-layout text-center valign'>
    <div className='valign-child'>
      <img className='logo' src={Logo} />
      <div className=''>
        {children}
      </div>
    </div>
    <Notification />
  </div>
);

AuthLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default AuthLayout;
