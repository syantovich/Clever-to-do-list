import React, { useEffect, useState, memo } from 'react';
import { Stack } from '@mui/material';
import { currDayInMonth, dayInWeek, daysInMonth } from '../../constants';
import CalendarDay from '../CalendarDay/CalendarDay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Calendar.css';
import { db } from '../../services/db';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { setLoading } from '../../store/isLoading/isLoadingSlice';
import { setPlans } from '../../store/plans/plansSlice';
import { getSelected } from '../../store/workMode/selector';
import { IPlans } from '../../store/plans/IPlans';
import processingData from '../../helpers/ProcessingData';

const Calendar = memo(() => {
  const { email } = useSelector(userSelector);
  const selected = useSelector(getSelected);
  const dispatch = useDispatch();
  let plans: IPlans = {};

  const [nextMonth, setNextMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<Date[]>([]);
  const [arrOfDays, setArrOfDays] = useState<JSX.Element[]>([]);
  const [indexActive, setIndexActive] = useState(0);
  const update = (i: number, month: number, newYear: number): JSX.Element => {
    let selectedDate = new Date(newYear, month, i + 1);
    return (
      <CalendarDay
        dayOfWeek={dayInWeek(newYear, month, i)}
        dayOfMonth={i}
        selected={selectedDate}
        isSelected={
          processingData.getDateWithoutHour(selectedDate) ===
          processingData.getDateWithoutHour(selected)
        }
        month={month}
        key={`${month} ${i}`}
      />
    );
  };
  const addDays = () => {
    let nextMonthArr: JSX.Element[] = [];
    const addingDays: Date[] = [];
    let year = new Date().getFullYear();
    let copyPlans = { ...plans };

    for (
      let i = nextMonth === new Date().getMonth() ? currDayInMonth() : 1;
      i <= daysInMonth(nextMonth + 1, year);
      i++
    ) {
      let date = new Date(year, nextMonth, i + 1);

      addingDays.push(date);
      const month = processingData.toYearMont(date);
      const day = processingData.getDay(date);
      if (!copyPlans[month]) {
        copyPlans[month] = {};
      }

      copyPlans[month][day] = {};
      nextMonthArr.push(update(i, nextMonth, year));
    }

    const key = new Date(year, nextMonth + 1).toISOString().slice(0, 7);
    db.getPlansOnMonth(email!, key)
      .then(result => {
        let res = result.data();
        if (res !== undefined) {
          for (let day in res) copyPlans[key][day] = res[day];
        }
      })
      .finally(() => {
        dispatch(setPlans(copyPlans));
        setNextMonth(nextMonth + 1);
        setArrOfDays(arrOfDays.concat(nextMonthArr));
        setDays(days.concat(addingDays));
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    let arr: JSX.Element[] = [];
    for (let i = 0; i < days.length; i++) {
      const day = days[i].getDate() - 1;
      const month = days[i].getMonth();
      const newYear = days[i].getFullYear();
      arr[i] = update(day, month, newYear);
    }
    setArrOfDays(arr);
  }, [selected]);

  useEffect(() => {
    dispatch(setLoading(true));
    addDays();
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
          if (days.length - 30 < e.item) {
            addDays();
          }
        }}
      />
    </Stack>
  );
});
Calendar.displayName = 'Calendar';
export default Calendar;
