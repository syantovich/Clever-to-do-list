import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { currDayInMonth, dayInWeek, daysInMonth } from '../../constants';
import CalendarDay from '../CalendarDay/CalendarDay';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const Calendar = () => {
  const [nextMonth, setNextMonth] = useState(new Date().getMonth());
  const [days, setDays] = useState<string[]>([]);
  const [arrOfDays, setArrOfDays] = useState<JSX.Element[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [indexActive, setIndexActive] = useState(0);
  const update = (i: number, month: number, year: number): JSX.Element => {
    let selected = new Date(year, month, i + 1).toISOString().slice(0, 10);

    return (
      <CalendarDay
        dayOfWeek={dayInWeek(year, month, i)}
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
    let nextMonthArr: JSX.Element[] = [...arrOfDays];
    const addingDays: string[] = [];
    let year = new Date().getFullYear();
    for (
      let i = nextMonth === new Date().getMonth() ? currDayInMonth() : 1;
      i < daysInMonth(nextMonth, year) + 1;
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
    console.log(selectedDate);
    let arr: JSX.Element[] = [];
    setIndexActive(days.indexOf(selectedDate) - 4);
    for (let i = 0; i < days.length; i++) {
      const day = +days[i].slice(8);
      const month = +days[i].slice(5, 7);
      const year = +days[i].slice(0, 4);
      arr[i] = update(day, month - 1, year);
    }
    setArrOfDays(arr);
  }, [selectedDate]);

  useEffect(() => {
    addDays();
    console.log(days);
  }, []);
  return (
    <Stack direction="row" spacing={2} height={80}>
      <AliceCarousel
        autoWidth
        autoHeight
        activeIndex={indexActive}
        disableDotsControls
        mouseTracking
        keyboardNavigation
        items={arrOfDays}
      />
    </Stack>
  );
};
export default Calendar;
