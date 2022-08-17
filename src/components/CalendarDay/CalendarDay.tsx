import React, { memo } from 'react';
import { Grid, Stack } from '@mui/material';
import { ICalendarDay } from './ICalendarDay';
import './CalendarDay.css';
import { importance, MonthArr } from '../../constants';
import isLoading, { IsLoadingEnum } from '../../store/isLoading/isLoading';
import switchGraphs from '../../store/switchGraphs/switchGraphs';
import workModeSelected from '../../store/workMode/workModeSelected';
import { observer } from 'mobx-react-lite';
import plans from '../../store/plans/plans';

const CalendarDay = memo(
  observer(
    ({ dayOfWeek, dayOfMonth, month, isSelected, selected }: ICalendarDay) => {
      const { isNotImportant, isImportant, isVeryImportant } =
        plans.importance(selected);
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
                switchGraphs.setGraphs(false);
                workModeSelected.setSelected(selected);
                workModeSelected.setWorkMode(0);
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
