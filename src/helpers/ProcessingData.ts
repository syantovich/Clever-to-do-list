const processingDate = {
  toYearMont(date: Date) {
    return date.toISOString().slice(0, 7);
  },
  getDay(date: Date) {
    return date.toISOString().slice(8, 10);
  },
  getMonth(date: Date) {
    return date.toISOString().slice(5, 7);
  },
  getDateWithoutHour(date: Date) {
    return date.toISOString().slice(0, 10);
  },
};
export default processingDate;
