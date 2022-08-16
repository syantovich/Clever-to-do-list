import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/user/selector';
import { toast } from 'react-toastify';
import { db } from '../services/db';
import { changePlansIsFinished } from '../store/plans/plansSlice';
import processingData from '../helpers/ProcessingData';

export type TypeUseChangeIsFinished = {
  name: string;
  id: string;
  desc?: string;
  important: string;
  addingDate: Date;
  timeStart: string;
  timeEnd: string;
  isFinished: boolean;
};

const useChangeIsFinished = ({
  id,
  name,
  desc,
  important,
  addingDate,
  timeStart,
  timeEnd,
  isFinished,
}: TypeUseChangeIsFinished) => {
  const { email } = useSelector(userSelector);
  const [isEnd, setIsEnd] = useState(isFinished);
  const dispatch = useDispatch();
  const setFinished = (is: boolean) => {
    toast
      .promise(
        db.updatePlans({
          email: email!,
          name,
          desc,
          important,
          date: addingDate,
          timeStart,
          timeEnd,
          id,
          isFinished: is,
        }),
        { pending: 'Changing', error: 'Error of Change', success: 'Changed' },
      )
      .then(() => {
        dispatch(
          changePlansIsFinished({
            month: processingData.toYearMont(addingDate),
            day: processingData.getDay(addingDate),
            id,
            is,
          }),
        );
        setIsEnd(is);
      });
  };
  return { isEnd, setFinished };
};
export default useChangeIsFinished;
