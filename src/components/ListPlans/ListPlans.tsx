import React, { useEffect, useState } from 'react';

import ElementOfListPlans from '../ElementOfListPlans/ElementOfListPlans';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import { Box, Grid } from '@mui/material';
import './ListPlans.css';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../store/isLoading/selector';
import OneCard from '../OneCard/OneCard';
import { getPlans } from '../../store/plans/selector';
import { getSelected } from '../../store/workMode/selector';

const ListPlans = () => {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const plans = useSelector(getPlans);
  const selected = useSelector(getSelected);
  const isLoading = useSelector(isLoadingSelector);
  const [openedPlan, setOpenedPlan] = useState<IinfoPlan | null>(null);
  useEffect(() => {
    if (!isLoading) {
      let arrOfValues: IinfoPlan[] = Object.values(
        plans[selected.slice(0, 7)][selected.slice(8)],
      );
      let sortedArr = arrOfValues.sort((a, b) => {
        if (a.timeStart === b.timeStart) {
          return b.timeEnd > a.timeEnd ? -1 : 1;
        } else {
          return b.timeStart > a.timeStart ? -1 : 1;
        }
      });
      setElements(
        sortedArr.map(e => {
          return (
            <Grid item xs={12} key={e.id}>
              <ElementOfListPlans
                {...e}
                setOpenedPlan={setOpenedPlan}
                addingDate={e.date}
                date={
                  new Date().toISOString().slice(0, 10) +
                  'T' +
                  new Date().toLocaleString().slice(12, 17)
                }
              />
            </Grid>
          );
        }),
      );
      console.log('----');
      console.log(sortedArr);
    }
  }, [selected, plans]);
  return (
    <>
      <Box className={'card_of_list'}>
        {isLoading ? (
          <LoadingSpinner />
        ) : elements.length ? (
          openedPlan ? (
            <OneCard
              {...openedPlan}
              setOpenedPlan={setOpenedPlan}
              addingDate={openedPlan.date}
              date={
                new Date().toISOString().slice(0, 10) +
                'T' +
                new Date().toLocaleString().slice(12, 17)
              }
            />
          ) : (
            <Grid container spacing={2}>
              {elements}
            </Grid>
          )
        ) : (
          <div className={'no_plan'}>No plans in this day</div>
        )}
      </Box>
    </>
  );
};
export default ListPlans;
