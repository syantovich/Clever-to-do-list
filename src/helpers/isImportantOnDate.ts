import processingData from './ProcessingData';
import plans from '../store/plans/plans';
import { importance } from '../constants';

export const IsImportantOnDate = (date: Date) => {
  let isNotImportant = false,
    isImportant = false,
    isVeryImportant = false;
  const yearMonth = processingData.toYearMont(date);
  const day = processingData.getDay(date);
  if (plans.plans[yearMonth]) {
    if (plans.plans[yearMonth][day]) {
      isNotImportant = Object.values(plans.plans[yearMonth][day]).some(
        e => e.important === importance[0].value,
      );
      isImportant = Object.values(plans.plans[yearMonth][day]).some(
        e => e.important === importance[1].value,
      );
      isVeryImportant = Object.values(plans.plans[yearMonth][day]).some(
        e => e.important === importance[2].value,
      );
    }
  }

  return { isNotImportant, isImportant, isVeryImportant };
};
