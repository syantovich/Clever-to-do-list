import React from 'react';
import { BottomNavigationAction, BottomNavigation } from '@mui/material';
import { Add, CalendarMonth } from '@mui/icons-material';
import './ButtonNav.css';
import workModeSelected from '../../store/workMode/workModeSelected';
import { observer } from 'mobx-react-lite';

const ButtonNav = observer(() => {
  return (
    <BottomNavigation
      showLabels
      value={workModeSelected.workMode}
      onChange={(event, newValue) => {
        workModeSelected.setWorkMode(newValue);
      }}>
      <BottomNavigationAction label="Calendar" icon={<CalendarMonth />} />
      <BottomNavigationAction label="Add" icon={<Add />} />
    </BottomNavigation>
  );
});
export default ButtonNav;
