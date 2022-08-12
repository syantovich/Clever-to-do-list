import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

interface IButtonLink {
  children: string;
  to: string;
}
const ButtonLink = ({ children, to }: IButtonLink) => {
  return (
    <Link to={to}>
      <Button>{children}</Button>
    </Link>
  );
};
export default ButtonLink;
