import React from 'react';
import './Logo.css';
import logo from '../../img/Time Square.svg';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className={'logo'} to={'/'}>
      <img src={logo} alt="logo" height={'100%'} /> Plan your day
    </Link>
  );
};
export default Logo;
