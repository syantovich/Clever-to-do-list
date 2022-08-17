import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { uid } from 'uid';
import { importance } from '../constants';
import { AddPlanType } from '../components/AddPlan/AddPlan.type';
import processingData from '../helpers/ProcessingData';
import plans from '../store/plans/plans';
import workModeSelected from '../store/workMode/workModeSelected';

const useAddPlan = ({ defaultObj, setIsEdit, setOpenedPlan }: AddPlanType) => {
  const [oldDate, setOldDate] = useState(defaultObj?.date);
  const [uuid, setUuid] = useState(defaultObj?.id || uid(32));
  const [name, setName] = useState(defaultObj?.name || '');
  const [desc, setDesc] = useState(defaultObj?.desc || '');
  const selectedDate = defaultObj?.date || workModeSelected.selected;
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
        plans.deletePlan(oldDate!, uuid).then(() => {
          setOldDate(addingDate);
          if (setIsEdit) {
            setIsEdit(false);
          }
          if (setOpenedPlan) {
            setOpenedPlan(null);
          }
        });
      }
      plans
        .addPlan({
          name,
          desc,
          important,
          date: addingDate,
          timeStart,
          timeEnd,
          id: uuid,
          isFinished: false,
        })
        .then(() => {
          if (!defaultObj?.id) {
            setUuid(uid(32));
          }
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
