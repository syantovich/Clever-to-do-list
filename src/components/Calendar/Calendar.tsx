import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { currDayInMonth, dayInWeek, daysInMonth } from '../../constants';
import CalendarDay from '../CalendarDay/CalendarDay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import './Calendar.css';

const Calendar = () => {
  const [nextMonth, setNextMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<string[]>([]);
  const [arrOfDays, setArrOfDays] = useState<JSX.Element[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [indexActive, setIndexActive] = useState(0);
  const update = (i: number, month: number, newYear: number): JSX.Element => {
    let selected = new Date(newYear, month, i + 1).toISOString().slice(0, 10);
    return (
      <CalendarDay
        dayOfWeek={dayInWeek(newYear, month, i)}
        dayOfMonth={i}
        selected={selected}
        isSelected={selected === selectedDate}
        month={month}
        key={`${month} ${i}`}
        onClick={setSelectedDate}
      />
    );
  };
  const addDays = () => {
    let nextMonthArr: JSX.Element[] = [];
    const addingDays: string[] = [];
    let year = new Date().getFullYear();

    for (
      let i = nextMonth === new Date().getMonth() ? currDayInMonth() : 1;
      i <= daysInMonth(nextMonth + 1, year);
      i++
    ) {
      addingDays.push(
        new Date(year, nextMonth, i + 1).toISOString().slice(0, 10),
      );
      nextMonthArr.push(update(i, nextMonth, year));
    }
    setNextMonth(nextMonth + 1);
    setArrOfDays(arrOfDays.concat(nextMonthArr));
    setDays(days.concat(addingDays));
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
  }, [selectedDate]);

  useEffect(() => {
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
          if (days.length - 10 > e.item) {
            addDays();
            setIndexActive(e.item);
          }
        }}
      />
    </Stack>
  );
};
export default Calendar;
