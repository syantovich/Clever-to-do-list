import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { db } from '../../services/db';
import { toast } from 'react-toastify';
import { ElementOfListPlansType } from './ElementOfListPlans.type';

const ElementOfListPlans = ({
  id,
  name,
  desc,
  important,
  addingDate,
  timeStart,
  timeEnd,
  plans,
  setPlans,
  isFinished,
}: ElementOfListPlansType) => {
  const date = new Date().toISOString().slice(0, 16);
  const dateStart = `${addingDate}T${timeStart}`;
  const dateEnd = `${addingDate}T${timeEnd}`;
  const [isEnd, setIsEnd] = useState(isFinished);
  const setFinished = (is: boolean) => {
    toast
      .promise(
        db.updatePlans({
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
        setIsEnd(is);
        let newPlans = [...plans];
        // @ts-ignore
        newPlans[addingDate.slice(0, 7)][addingDate.slice(8)][id].isFinished =
          is;

        setPlans(newPlans);
      });
  };
  return (
    <Accordion
      className={`${important} ${
        date > dateStart && date < dateEnd ? 'now' : ''
      }`}
      disabled={dateEnd < date}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header">
        <Typography>
          {name} from {timeStart}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
          <Checkbox
            value={isEnd}
            onChange={() => {
              setFinished(!isEnd);
            }}
          />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
export default ElementOfListPlans;
