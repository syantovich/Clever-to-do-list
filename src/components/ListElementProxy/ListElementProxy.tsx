import React from 'react';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import OneCard from '../OneCard/OneCard';
import Graphs from '../Graphs/Graphs';
import { Grid } from '@mui/material';
import ElementOfListPlans from '../ElementOfListPlans/ElementOfListPlans';

const ListElementProxy = ({
  sortedList,
  openedPlan,
  isGraph,
  memSetOpenedPlan,
}: {
  sortedList: IinfoPlan[];
  openedPlan: IinfoPlan | null;
  isGraph: boolean;
  memSetOpenedPlan: React.Dispatch<React.SetStateAction<IinfoPlan | null>>;
}) => {
  const currTime =
    new Date().toISOString().slice(0, 10) +
    'T' +
    new Date().toLocaleString().slice(12, 17);

  if (sortedList.length) {
    if (openedPlan) {
      return (
        <OneCard
          {...openedPlan}
          setOpenedPlan={memSetOpenedPlan}
          addingDate={openedPlan.date}
          date={currTime}
        />
      );
    } else {
      if (isGraph) {
        return (
          <Graphs sortedList={sortedList} setOpenedPlan={memSetOpenedPlan} />
        );
      } else {
        return (
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
        );
      }
    }
  } else {
    return <div className={'no_plan'}>No plans in this day</div>;
  }
};

export default ListElementProxy;
