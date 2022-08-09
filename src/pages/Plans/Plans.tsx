import React, { useEffect } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import AddPlan from '../../components/AddPlan/AddPlan';
import ListPlans from '../../components/ListPlans/ListPlans';
import { useSelector } from 'react-redux';
import { getWorkMode } from '../../store/workMode/selector';
import { isLoadingSelector } from '../../store/isLoading/selector';

const Plans = () => {
  const workMod = useSelector(getWorkMode);
  const isLoading = useSelector(isLoadingSelector);
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
        className={'wrapper_plans_grid'}>
        <Grid item xs={true} className={'wrapper_plans_content'}>
          {workMod === 1 && <AddPlan />}
          {workMod === 0 && <ListPlans />}
        </Grid>
        {!isLoading && (
          <Grid item xs={2}>
            <ButtonNav />
          </Grid>
        )}
        <Grid item xs={2}>
          <Calendar />
        </Grid>
      </Grid>
    </section>
  );
};
export default Plans;
