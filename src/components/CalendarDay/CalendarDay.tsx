import React, { memo, useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { ICalendarDay } from './ICalendarDay';
import './CalendarDay.css';
import { importance, MonthArr } from '../../constants';
import isLoading, { IsLoadingEnum } from '../../store/isLoading/isLoading';
import { IsImportantOnDate } from '../../helpers/isImportantOnDate';
import plans from '../../store/plans/plans';
import { observer } from 'mobx-react-lite';

const CalendarDay = memo(
  observer(
    ({
      dayOfWeek,
      dayOfMonth,
      month,
      isSelected,
      selected,
      setIsGraph,
      setWorkMode,
    }: ICalendarDay) => {
      const [isNotI, setIsNotI] = useState(false);
      const [isI, setIsI] = useState(false);
      const [isVeryI, setIsVeryI] = useState(false);
      useEffect(() => {
        const { isNotImportant, isImportant, isVeryImportant } =
          IsImportantOnDate(selected);
        console.log({ isNotImportant, isImportant, isVeryImportant });
        setIsNotI(isNotImportant);
        setIsI(isImportant);
        setIsVeryI(isVeryImportant);
      }, [plans.plans, selected]);

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
                isLoading.setLoading(IsLoadingEnum.pending);
                setIsGraph(false);
                plans.setSelected(selected);
                setWorkMode(0);
                isLoading.setLoading(IsLoadingEnum.success);
              }}>
              <div className={'icons_important'}>
                <Grid
                  container
                  direction={'row'}
                  justifyContent={'space-between'}>
                  <Grid item>
                    <div
                      className={`${
                        isNotI ? importance[0].value : ''
                      } circle_important`}
                    />
                  </Grid>
                  <Grid item>
                    <div
                      className={`${
                        isI ? importance[1].value : ''
                      } circle_important`}
                    />
                  </Grid>
                  <Grid item>
                    <div
                      className={`${
                        isVeryI ? importance[2].value : ''
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
                className={`day_of_week ${
                  dayOfWeek[0] === 'S' ? 'day_of' : ''
                }`}>
                {dayOfWeek}
              </Grid>
              <Grid item xs={12} className={`month`}>
                {MonthArr[month % 12]}
              </Grid>
            </Grid>
          </Stack>
        </>
      );
    },
  ),
);
CalendarDay.displayName = 'CalendarDay';
export default CalendarDay;
