import React, { memo } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import { useSelector } from 'react-redux';
import { getWorkMode } from '../../store/workMode/selector';
import { isLoadingSelector } from '../../store/isLoading/selector';
import WorkModeProxy from '../../components/workModeProxy/WorkModeProxy';
import { IsLoadingEnum } from '../../store/isLoading/isLoadingSlice';

const Plans = memo(() => {
  const workMod = useSelector(getWorkMode);
  const isLoading = useSelector(isLoadingSelector);
  return (
    <Grid
      container
      spacing={1}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'flex-end'}
      wrap={'nowrap'}
      className={'wrapper_plans_grid'}>
      <Grid item xs={7} className={'wrapper_plans_content'}>
        <WorkModeProxy workMode={workMod} />
      </Grid>
      {isLoading === IsLoadingEnum.success && (
        <Grid item xs={1}>
          <ButtonNav />
        </Grid>
      )}
      <Grid item xs={1}>
        <Calendar />
      </Grid>
    </Grid>
  );
});
Plans.displayName = 'Plans';
export default Plans;
