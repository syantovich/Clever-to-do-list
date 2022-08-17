import React, { memo, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { dayInWeek } from '../../constants';
import CalendarDay from '../CalendarDay/CalendarDay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Calendar.css';
import plans from '../../store/plans/plans';
import { observer } from 'mobx-react-lite';
import processingData from '../../helpers/ProcessingData';
import workModeSelected from '../../store/workMode/workModeSelected';

const Calendar = memo(
  observer(() => {
    const [arrOfDays, setArrOfDays] = useState<JSX.Element[]>([]);
    const [indexActive, setIndexActive] = useState(0);
    useEffect(() => {
      setArrOfDays(
        Object.values(plans.days).map(e => {
          let selectedDate = new Date(
            e.getFullYear(),
            e.getMonth(),
            e.getDate(),
          );
          const stringSelected =
            processingData.getDateWithoutHour(selectedDate);
          return (
            <CalendarDay
              dayOfWeek={dayInWeek(
                e.getFullYear(),
                e.getMonth(),
                e.getDate() - 1,
              )}
              dayOfMonth={+processingData.getDay(selectedDate)}
              selected={selectedDate}
              isSelected={
                stringSelected ===
                processingData.getDateWithoutHour(workModeSelected.selected)
              }
              month={e.getMonth()}
              key={e.toISOString()}
            />
          );
        }),
      );
    }, [plans.days, workModeSelected.selected]);
    // useEffect(() => {
    //   let arr: JSX.Element[] = [];
    //   for (let i = 0; i < plans.days.length; i++) {
    //     const day = plans.days[i].getDate() - 1;
    //     const month = plans.days[i].getMonth();
    //     const newYear = plans.days[i].getFullYear();
    //     arr[i] = update(day, month, newYear);
    //   }
    //   setArrOfDays(arr);
    // }, [workModeSelected.selected]);
    const add = () => {
      // let arr: JSX.Element[] = [];
      plans.addDays();
      // setArrOfDays([...arrOfDays, ...arr]);
    };
    useEffect(() => {
      add();
    }, []);
    return (
      <Stack
        direction="row"
        spacing={2}
        height={100}
        className={'calendar_wrapper'}>
        <AliceCarousel
          autoWidth
          activeIndex={indexActive}
          disableDotsControls
          mouseTracking
          keyboardNavigation
          items={arrOfDays}
          onSlideChanged={e => {
            setIndexActive(e.item);
            while (Object.keys(plans.days).length - 30 < e.item) {
              add();
            }
          }}
        />
      </Stack>
    );
  }),
);
Calendar.displayName = 'Calendar';
export default Calendar;
