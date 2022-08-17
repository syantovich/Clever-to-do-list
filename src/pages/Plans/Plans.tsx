import React, { memo, useEffect } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import WorkModeProxy from '../../components/workModeProxy/WorkModeProxy';
import isLoading, { IsLoadingEnum } from '../../store/isLoading/isLoading';
import workModeSelected from '../../store/workMode/workModeSelected';
import { observer } from 'mobx-react-lite';

const Plans = memo(
  observer(() => {
    useEffect(() => {
      isLoading.setLoading(IsLoadingEnum.pending);
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
          <WorkModeProxy workMode={workModeSelected.workMode} />
        </Grid>
        {isLoading.isLoading === IsLoadingEnum.success && (
          <Grid item xs={1}>
            <ButtonNav />
          </Grid>
        )}
        <Grid item xs={1}>
          <Calendar />
        </Grid>
      </Grid>
    );
  }),
);
Plans.displayName = 'Plans';
export default Plans;
