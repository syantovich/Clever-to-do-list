import { useEffect, useState } from 'react';
import processingData from '../helpers/ProcessingData';
import { importance } from '../constants';
import { useSelector } from 'react-redux';
import { getPlans } from '../store/plans/selector';

const useIsImportant = (selected: Date) => {
  const plans = useSelector(getPlans);
  const [isNotImportant, setIsNotImportant] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [isVeryImportant, setIsVeryImportant] = useState(false);
  useEffect(() => {
    const yearMonth = processingData.toYearMont(selected);
    const day = processingData.getDay(selected);
    if (plans[yearMonth]) {
      if (plans[yearMonth][day]) {
        setIsNotImportant(
          Object.values(plans[yearMonth][day]).some(
            e => e.important === importance[0].value,
          ),
        );
        setIsImportant(
          Object.values(plans[yearMonth][day]).some(
            e => e.important === importance[1].value,
          ),
        );
        setIsVeryImportant(
          Object.values(plans[yearMonth][day]).some(
            e => e.important === importance[2].value,
          ),
        );
      }
    }
  }, [plans]);
  return { isNotImportant, isImportant, isVeryImportant };
};
export default useIsImportant;
