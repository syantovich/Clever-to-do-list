import React, { useEffect, useState } from 'react';
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

const Calendar = () => {
  const { email } = useSelector(userSelector);
  const selected = useSelector(getSelected);
  const dispatch = useDispatch();
  let plans: IPlans = {};
  console.log(plans);
  const [nextMonth, setNextMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<string[]>([]);
  const [arrOfDays, setArrOfDays] = useState<JSX.Element[]>([]);
  const [indexActive, setIndexActive] = useState(0);
  const update = (i: number, month: number, newYear: number): JSX.Element => {
    let selectedDate = new Date(newYear, month, i + 1)
      .toISOString()
      .slice(0, 10);
    return (
      <CalendarDay
        dayOfWeek={dayInWeek(newYear, month, i)}
        dayOfMonth={i}
        selected={selectedDate}
        isSelected={selectedDate === selected}
        month={month}
        key={`${month} ${i}`}
      />
    );
  };
  const addDays = () => {
    let nextMonthArr: JSX.Element[] = [];
    const addingDays: string[] = [];
    let year = new Date().getFullYear();
    console.log(plans);
    let copyPlans = { ...plans };

    for (
      let i = nextMonth === new Date().getMonth() ? currDayInMonth() : 1;
      i <= daysInMonth(nextMonth + 1, year);
      i++
    ) {
      let date = new Date(year, nextMonth, i + 1).toISOString().slice(0, 10);
      addingDays.push(date);
      if (!copyPlans[date.slice(0, 7)]) {
        copyPlans[date.slice(0, 7)] = {};
      }

      copyPlans[date.slice(0, 7)][date.slice(8)] = {};
      nextMonthArr.push(update(i, nextMonth, year));
    }

    const key = new Date(year, nextMonth + 1).toISOString().slice(0, 7);
    db.getPlansOnMonth(email!, key)
      .then(result => {
        let res = result.data();
        if (res !== undefined) {
          // copyPlans[key] = result.data();

          for (let day in res) copyPlans[key][day] = res[day];
          console.log(copyPlans);
          console.log(result.data());
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
      const day = +days[i].slice(8);
      const month = +days[i].slice(5, 7);
      const newYear = +days[i].slice(0, 4);
      arr[i] = update(day, month - 1, newYear);
    }
    setArrOfDays(arr);
  }, [selected]);

  useEffect(() => {
    dispatch(setLoading(true));
    addDays();
    console.log(false);
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
          if (days.length - 30 < e.item) {
            setIndexActive(e.item);
            addDays();
          }
        }}
      />
    </Stack>
  );
};
export default Calendar;
