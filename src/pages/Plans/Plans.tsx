import React, { useEffect, useState } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import { importance } from '../../constants';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import AddPlan from '../../components/AddPlan/AddPlan';
import ListPlans from '../../components/ListPlans/ListPlans';

const Plans = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [workMod, setWorkMode] = useState(0);
  const [plans, setPlans] = useState({});
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [important, setImportant] = useState(importance[0].value);
  const [addingDate, setAddingDate] = useState(selectedDate);
  const [timeStart, setTimeStart] = useState<string>('09:30');
  const [timeEnd, setTimeEnd] = useState<string>('10:30');

  useEffect(() => {
    console.log(workMod);
  }, [workMod]);
  return (
    <section className={'wrapper_plans'}>
      <Grid
        container
        spacing={2}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        className={'content'}>
        {workMod === 1 && (
          <AddPlan
            name={name}
            setName={setName}
            desc={desc}
            setDesc={setDesc}
            setImportant={setImportant}
            important={important}
            addingDate={addingDate}
            setAddingDate={setAddingDate}
            timeStart={timeStart}
            setTimeStart={setTimeStart}
            setTimeEnd={setTimeEnd}
            timeEnd={timeEnd}
            plans={plans}
            setPlans={setPlans}
          />
        )}
        {workMod == 0 && Object.keys(plans).length && (
          <ListPlans
            plans={plans}
            setPlans={setPlans}
            selected={selectedDate}
          />
        )}
        <Grid item xs={2}>
          <ButtonNav workMode={workMod} setWorkMode={setWorkMode} />
        </Grid>
        <Grid item xs={2}>
          <Calendar
            selected={selectedDate}
            setSelected={setSelectedDate}
            plans={plans}
            setPlans={setPlans}
          />
        </Grid>
      </Grid>
    </section>
  );
};
export default Plans;
