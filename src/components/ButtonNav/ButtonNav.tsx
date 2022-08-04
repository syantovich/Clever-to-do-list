import React from 'react';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import { ButtonNavType } from './ButtonNav.type';

const ButtonNav = ({ workMode, setWorkMode }: ButtonNavType) => {
  return (
    <BottomNavigation
      showLabels
      value={workMode}
      onChange={(event, newValue) => {
        setWorkMode(newValue);
      }}>
      <BottomNavigationAction label="Calendar" icon={<CalendarMonth />} />
      <BottomNavigationAction label="Add" icon={<Add />} />
    </BottomNavigation>
  );
};
export default ButtonNav;
