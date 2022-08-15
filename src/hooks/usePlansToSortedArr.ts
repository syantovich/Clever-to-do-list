import { useEffect, useState } from 'react';
import { IinfoPlan } from '../pages/Plans/IinfoPlan';
import { useSelector } from 'react-redux';
import { getPlans } from '../store/plans/selector';
import { isLoadingSelector } from '../store/isLoading/selector';
import { getSelected } from '../store/workMode/selector';
import processingData from '../helpers/ProcessingData';
import { IsLoadingEnum } from '../store/isLoading/isLoadingSlice';

export const usePlansToSortedArr = () => {
  const plans = useSelector(getPlans);
  const selected = useSelector(getSelected);
  const isLoading = useSelector(isLoadingSelector);
  const [arr, setArr] = useState<IinfoPlan[]>([]);
  useEffect(() => {
    if (isLoading === IsLoadingEnum.success) {
      let month = processingData.toYearMont(selected);
      let day = processingData.getDay(selected);
      let arrOfValues: IinfoPlan[] = Object.values(plans[month][day]);
      let sortedArr = arrOfValues.sort((a, b) => {
        if (a.timeStart === b.timeStart) {
          return b.timeEnd > a.timeEnd ? -1 : 1;
        } else {
          return b.timeStart > a.timeStart ? -1 : 1;
        }
      });
      setArr(sortedArr);
    }
  }, [selected, plans]);
  return arr;
};
