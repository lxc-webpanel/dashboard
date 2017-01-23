import React from 'react';
import { Link } from 'react-router';
import LogoInline from '../../../../public/logo-inline.svg';

const Logo = () => (
  <Link to='/'>
    <img className='logo-inline' src={LogoInline} />
  </Link>
);

Logo.muiName = 'LogoInline';

export default Logo;
