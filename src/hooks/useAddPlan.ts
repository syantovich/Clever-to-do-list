import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { db } from '../services/db';
import { addPlan, deletePlan } from '../store/plans/plansSlice';
import { uid } from 'uid';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../store/user/selector';
import { getSelected } from '../store/workMode/selector';
import { importance } from '../constants';
import { AddPlanType } from '../components/AddPlan/AddPlan.type';
import processingData from '../helpers/ProcessingData';

const useAddPlan = ({ defaultObj, setIsEdit, setOpenedPlan }: AddPlanType) => {
  const { email } = useSelector(userSelector);
  const dispatch = useDispatch();
  const [oldDate, setOldDate] = useState(defaultObj?.date);
  const [uuid, setUuid] = useState(defaultObj?.id || uid(32));
  const [name, setName] = useState(defaultObj?.name || '');
  const [desc, setDesc] = useState(defaultObj?.desc || '');
  const selectedDate = defaultObj?.date || useSelector(getSelected);
  const [important, setImportant] = useState(
    defaultObj?.important || importance[0].value,
  );
  const [addingDate, setAddingDate] = useState(selectedDate);
  const [timeStart, setTimeStart] = useState<string>(
    defaultObj?.timeStart || '09:30',
  );
  const [timeEnd, setTimeEnd] = useState<string>(
    defaultObj?.timeEnd || '10:30',
  );
  const getName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setName(event.target.value);
  };
  const getDesc = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDesc(event.target.value);
  };
  const getImportant = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setImportant(event.target.value);
  };
  const getAddingDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAddingDate(new Date(event.target.value));
  };
  const getTimeStart = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTimeStart(event.target.value);
  };
  const getTimeEnd = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTimeEnd(event.target.value);
  };
  const addPlanFetch = () => {
    if (timeStart <= timeEnd && name.length) {
      if (defaultObj?.date !== addingDate && !!defaultObj?.date) {
        toast
          .promise(db.deletePlan(email!, oldDate!, uuid), {
            error: 'Save error',
            success: 'deleted',
            pending: 'deleting',
          })
          .then(() => {
            setOldDate(addingDate);
            if (setIsEdit) {
              setIsEdit(false);
            }
            if (setOpenedPlan) {
              setOpenedPlan(null);
            }

            dispatch(deletePlan({ date: oldDate!, id: uuid }));
          });
      }
      toast
        .promise(
          db
            .updatePlans({
              email: email!,
              name,
              desc,
              important,
              date: addingDate,
              timeStart,
              timeEnd,
              id: uuid,
              isFinished: false,
            })
            .catch(() => {
              return db.addPlans({
                email: email!,
                name,
                desc,
                important,
                date: addingDate,
                timeStart,
                timeEnd,
                id: uuid,
                isFinished: false,
              });
            }),
          {
            success: 'Plan added',
            error: 'Something wrong',
            pending: 'Loading',
          },
        )
        .then(() => {
          if (!defaultObj?.id) {
            setUuid(uid(32));
          }
          dispatch(
            addPlan({
              name,
              desc,
              important,
              date: addingDate,
              timeStart,
              timeEnd,
              id: uuid,
              isFinished: false,
            }),
          );
        });
    } else {
      if (timeStart > timeEnd) {
        toast.error('Time start could be more then time end');
      }

      if (!name.length) {
        toast.error('Name is required');
      }
    }
  };

  return {
    name,
    getName,
    addPlan: addPlanFetch,
    desc,
    getDesc,
    important,
    getImportant,
    addingDate: processingData.getDateWithoutHour(addingDate),
    getAddingDate,
    timeStart,
    timeEnd,
    getTimeStart,
    getTimeEnd,
  };
};
export default useAddPlan;
