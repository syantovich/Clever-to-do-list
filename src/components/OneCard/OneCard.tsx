import React, { useState } from 'react';
import { Checkbox, Typography, Box, CardContent, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { OneCardType } from './OneCard.type';
import { db } from '../../services/db';
import './OneCard.css';
import { changePlansIsFinished } from '../../store/plans/plansSlice';
import AddPlan from '../AddPlan/AddPlan';
import EditIcon from '@mui/icons-material/Edit';

const OneCard = ({
  id,
  name,
  desc,
  important,
  addingDate,
  timeStart,
  timeEnd,
  isFinished,
  setOpenedPlan,
  date,
}: OneCardType) => {
  const [isEdit, setIsEdit] = useState(false);
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
            month: addingDate.slice(0, 7),
            day: addingDate.slice(8),
            id,
            is,
          }),
        );
        setIsEnd(is);
      });
  };
  return (
    <Box className={'wrapper_card'}>
      <Card className={'content'}>
        <div className={'cross'} onClick={() => setOpenedPlan(null)}>
          <CloseIcon />
        </div>
        {!isEdit && (
          <CardContent>
            <div className={'edit'} onClick={() => setIsEdit(true)}>
              <EditIcon />
            </div>

            <Typography>Name:</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {name}
            </Typography>
            <Typography>Date:</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {addingDate}
            </Typography>
            <Typography>Description:</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {desc}
            </Typography>
            <Typography>Time start:</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {timeStart}
            </Typography>
            <Typography>Time end:</Typography>
            <Typography variant="h6" gutterBottom component="div">
              {timeEnd}
            </Typography>
            <Typography>Finished </Typography>
            {!(isFinished || `${addingDate}T${timeEnd}` < date) && (
              <Checkbox
                value={isEnd}
                onChange={e => {
                  setFinished(e.target.checked);
                }}
              />
            )}
          </CardContent>
        )}
        {isEdit && (
          <AddPlan
            defaultObj={{
              name,
              desc,
              important,
              date: addingDate,
              timeStart,
              timeEnd,
              id,
              isFinished: isEnd,
            }}
            setIsEdit={setIsEdit}
            setOpenedPlan={setOpenedPlan}
          />
        )}
      </Card>
    </Box>
  );
};

export default OneCard;
