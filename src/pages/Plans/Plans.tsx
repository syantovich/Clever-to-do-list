import React, { memo, useEffect, useState } from 'react';
import './Plans.css';
import Calendar from '../../components/Calendar/Calendar';
import { Grid } from '@mui/material';
import ButtonNav from '../../components/ButtonNav/ButtonNav';
import WorkModeProxy from '../../components/workModeProxy/WorkModeProxy';
import isLoading, { IsLoadingEnum } from '../../store/isLoading/isLoading';
import { observer } from 'mobx-react-lite';
import plans from '../../store/plans/plans';

const Plans = memo(
  observer(() => {
    const [isGraph, setIsGraph] = useState(false);
    const [workMode, setWorkMode] = useState(0);
    useEffect(() => {
      isLoading.setLoading(IsLoadingEnum.pending);
      plans.setSelected(new Date());
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
          <WorkModeProxy
            workMode={workMode}
            isGraph={isGraph}
            setIsGraph={setIsGraph}
          />
        </Grid>
        {isLoading.isLoading === IsLoadingEnum.success && (
          <Grid item xs={1}>
            <ButtonNav workMode={workMode} setWorkMode={setWorkMode} />
          </Grid>
        )}
        <Grid item xs={1}>
          <Calendar setIsGraph={setIsGraph} setWorkMode={setWorkMode} />
        </Grid>
      </Grid>
    );
  }),
);
Plans.displayName = 'Plans';
export default Plans;
