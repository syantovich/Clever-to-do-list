import React from 'react';

export interface ICalendarDay {
  dayOfWeek: string;
  dayOfMonth: number;
  month: number;
  isSelected: boolean;
  selected: Date;
  setIsGraph: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkMode: React.Dispatch<React.SetStateAction<number>>;
}
