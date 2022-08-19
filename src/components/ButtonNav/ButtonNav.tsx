import React from 'react';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import './ButtonNav.css';
import { observer } from 'mobx-react-lite';

const ButtonNav = observer(
  ({
    workMode,
    setWorkMode,
  }: {
    workMode: number;
    setWorkMode: React.Dispatch<React.SetStateAction<number>>;
  }) => {
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
  },
);
export default ButtonNav;
