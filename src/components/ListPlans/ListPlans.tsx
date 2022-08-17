import React, { useCallback, useState } from 'react';

import ElementOfListPlans from '../ElementOfListPlans/ElementOfListPlans';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import { Box, Grid, FormControlLabel, Switch } from '@mui/material';
import './ListPlans.css';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';
import OneCard from '../OneCard/OneCard';
import Graphs from '../Graphs/Graphs';
// import { usePlansToSortedArr } from '../../hooks/usePlansToSortedArr';
import switchGraphs from '../../store/switchGraphs/switchGraphs';
import { observer } from 'mobx-react-lite';
import plans from '../../store/plans/plans';

const ListPlans = observer(() => {
  const [openedPlan, setOpenedPlan] = useState<IinfoPlan | null>(null);
  const sortedList = plans.sortedArrInDate;
  const memSetOpenedPlan = useCallback(setOpenedPlan, [openedPlan]);
  const currTime =
    new Date().toISOString().slice(0, 10) +
    'T' +
    new Date().toLocaleString().slice(12, 17);

  return (
    <LoadingSpinner>
      <Box className={'card_of_list'}>
        <FormControlLabel
          control={
            <Switch
              checked={switchGraphs.isGraphs}
              disabled={!sortedList.length}
              onChange={(e, v) => {
                switchGraphs.setGraphs(v);
              }}
            />
          }
          label="Graphs"
          className={'switch_graphs'}
        />

        {sortedList.length ? (
          openedPlan ? (
            <OneCard
              {...openedPlan}
              setOpenedPlan={memSetOpenedPlan}
              addingDate={openedPlan.date}
              date={currTime}
            />
          ) : switchGraphs.isGraphs ? (
            <Graphs sortedList={sortedList} setOpenedPlan={memSetOpenedPlan} />
          ) : (
            <Grid container spacing={2}>
              {sortedList.map(e => {
                console.log(typeof e.date);
                return (
                  <Grid item xs={12} key={e.id}>
                    <ElementOfListPlans
                      {...e}
                      setOpenedPlan={memSetOpenedPlan}
                      addingDate={e.date}
                      date={currTime}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )
        ) : (
          <div className={'no_plan'}>No plans in this day</div>
        )}
      </Box>
    </LoadingSpinner>
  );
});
export default ListPlans;
