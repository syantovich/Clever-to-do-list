import React, { useState } from 'react';
import { Checkbox, Typography, Box, CardContent, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/user/selector';
import { OneCardType } from './OneCard.type';
import { db } from '../../services/db';
import './OneCard.css';

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
  plans,
  setPlans,
}: OneCardType) => {
  const { email } = useSelector(userSelector);
  const [isEnd, setIsEnd] = useState(isFinished);
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
        let copy = { ...plans };
        copy[date.slice(0, 7)][addingDate.slice(8)][id].isFinished = is;
        setPlans(copy);
        setIsEnd(is);
      });
  };
  return (
    <Box className={'wrapper_card'}>
      <Card className={'content'}>
        <CardContent>
          <div className={'cross'} onClick={() => setOpenedPlan(null)}>
            <CloseIcon />
          </div>
          <Typography>
            Date:
            <Typography variant="h6" gutterBottom component="div">
              {addingDate}
            </Typography>
          </Typography>
          <Typography>
            Description:
            <Typography variant="h6" gutterBottom component="div">
              {desc}
            </Typography>
          </Typography>
          <Typography>
            Time start:
            <Typography variant="h6" gutterBottom component="div">
              {timeStart}
            </Typography>
          </Typography>
          <Typography>
            Time end:
            <Typography variant="h6" gutterBottom component="div">
              {timeEnd}
            </Typography>
          </Typography>
          <Typography>
            Finished
            {!(isFinished || `${addingDate}T${timeEnd}` < date) && (
              <Checkbox
                value={isEnd}
                onChange={e => {
                  setFinished(e.target.checked);
                }}
              />
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OneCard;
