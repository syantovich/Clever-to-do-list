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

const Calendar = memo(
  observer(
    ({
      setIsGraph,
      setWorkMode,
    }: {
      setIsGraph: React.Dispatch<React.SetStateAction<boolean>>;
      setWorkMode: React.Dispatch<React.SetStateAction<number>>;
    }) => {
      const [indexActive, setIndexActive] = useState(0);
      useEffect(() => {
        plans.addDays();
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
            items={Object.values(plans.days).map(e => {
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
                    processingData.getDateWithoutHour(plans.selected)
                  }
                  month={e.getMonth()}
                  key={e.toISOString()}
                  setIsGraph={setIsGraph}
                  setWorkMode={setWorkMode}
                />
              );
            })}
            onSlideChanged={e => {
              setIndexActive(e.item);
              while (Object.keys(plans.days).length - 30 < e.item) {
                plans.addDays();
              }
            }}
          />
        </Stack>
      );
    },
  ),
);
Calendar.displayName = 'Calendar';
export default Calendar;
