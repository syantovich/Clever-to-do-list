import React, { useEffect, useState } from 'react';
import { Stack, Grid } from '@mui/material';
import { ICalendarDay } from './ICalendarDay';
import './CalendarDay.css';
import { importance, MonthArr } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSelected, setWorkMode } from '../../store/workMode/workModeSlice';
import { setGraphs } from '../../store/switchGraphs/switchGraphsSlice';
import { setLoading } from '../../store/isLoading/isLoadingSlice';
import { getPlans } from '../../store/plans/selector';

const CalendarDay = ({
  dayOfWeek,
  dayOfMonth,
  month,
  isSelected,
  selected,
}: ICalendarDay) => {
  const dispatch = useDispatch();
  const plans = useSelector(getPlans);
  const [isNotImportant, setIsNotImportant] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [isVeryImportant, setIsVeryImportant] = useState(false);
  useEffect(() => {
    if (plans[selected.slice(0, 7)]) {
      if (plans[selected.slice(0, 7)][selected.slice(8)]) {
        setIsNotImportant(
          Object.values(plans[selected.slice(0, 7)][selected.slice(8)]).some(
            e => e.important === importance[0].value,
          ),
        );
        setIsImportant(
          Object.values(plans[selected.slice(0, 7)][selected.slice(8)]).some(
            e => e.important === importance[1].value,
          ),
        );
        setIsVeryImportant(
          Object.values(plans[selected.slice(0, 7)][selected.slice(8)]).some(
            e => e.important === importance[2].value,
          ),
        );
      }
    }
  }, [plans]);
  return (
    <>
      <Stack
        alignItems="center"
        padding={1}
        spacing={1}
        width={70}
        height={50}
        marginLeft={3}
        draggable={false}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={`day_element ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            console.log(dayOfWeek, dayOfMonth, month, isSelected, selected);
            console.log(plans);
            dispatch(setLoading(true));
            dispatch(setGraphs(false));
            dispatch(setSelected(selected));
            dispatch(setWorkMode(0));
            dispatch(setLoading(false));
          }}>
          <div className={'icons_important'}>
            <Grid container direction={'row'} justifyContent={'space-between'}>
              <Grid item>
                <div
                  className={`${
                    isNotImportant ? importance[0].value : ''
                  } circle_important`}
                />
              </Grid>
              <Grid item>
                <div
                  className={`${
                    isImportant ? importance[1].value : ''
                  } circle_important`}
                />
              </Grid>
              <Grid item>
                <div
                  className={`${
                    isVeryImportant ? importance[2].value : ''
                  } circle_important`}
                />
              </Grid>
            </Grid>
          </div>
          <Grid item xs={12}>
            {dayOfMonth}
          </Grid>
          <Grid
            item
            xs={12}
            className={`day_of_week ${dayOfWeek[0] === 'S' ? 'day_of' : ''}`}>
            {dayOfWeek}
          </Grid>
          <Grid item xs={12} className={`month`}>
            {MonthArr[month % 12]}
          </Grid>
        </Grid>
      </Stack>
    </>
  );
};
export default CalendarDay;
