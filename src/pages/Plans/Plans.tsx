import React, { memo, useEffect } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import { useDispatch, useSelector } from 'react-redux';
import { getWorkMode } from '../../store/workMode/selector';
import { isLoadingSelector } from '../../store/isLoading/selector';
import WorkModeProxy from '../../components/workModeProxy/WorkModeProxy';
import {
  IsLoadingEnum,
  setLoading,
} from '../../store/isLoading/isLoadingSlice';

const Plans = memo(() => {
  const workMod = useSelector(getWorkMode);
  const isLoading = useSelector(isLoadingSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(IsLoadingEnum.pending));
  }, []);

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
