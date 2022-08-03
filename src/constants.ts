export const DayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MonthArr = [
  'Jun',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month, 0).getDate();
}
export function currDayInMonth() {
  return new Date().getDate();
}
export function dayInWeek(
  year: number,
  month: number,
  dayMonth: number,
): string {
  let date = new Date(year, month, dayMonth);
  return DayOfWeek[date.getDay()];
}
