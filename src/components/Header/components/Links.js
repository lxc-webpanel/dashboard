import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Links.scss';

export const Links = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/auth' activeClassName='route--active'>
      Login View
    </IndexLink>
    {' · '}
    <Link to='/' activeClassName='route--active'>
      Home
    </Link>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    {' · '}
    <Link to='/auth/logout'>
      Logout
    </Link>
  </div>
);

export default Links;
