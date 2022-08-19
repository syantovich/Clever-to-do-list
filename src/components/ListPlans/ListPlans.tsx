import React, { useCallback, useState } from 'react';

import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import { Box, FormControlLabel, Switch } from '@mui/material';
import './ListPlans.css';
import LoadingSpinner from '../LoadingSpiner/LoadingSpiner';
import { observer } from 'mobx-react-lite';
import plans from '../../store/plans/plans';
import ListElementProxy from '../ListElementProxy/ListElementProxy';

const ListPlans = observer(
  ({
    isGraph,
    setIsGraph,
  }: {
    isGraph: boolean;
    setIsGraph: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [openedPlan, setOpenedPlan] = useState<IinfoPlan | null>(null);
    const sortedList = plans.sortedArrInDate;
    const memSetOpenedPlan = useCallback(setOpenedPlan, [openedPlan]);

    return (
      <LoadingSpinner>
        <Box className={'card_of_list'}>
          <FormControlLabel
            control={
              <Switch
                checked={isGraph}
                disabled={!sortedList.length}
                onChange={(e, v) => {
                  setIsGraph(v);
                }}
              />
            }
            label="Graphs"
            className={'switch_graphs'}
          />

          <ListElementProxy
            sortedList={sortedList}
            openedPlan={openedPlan}
            isGraph={isGraph}
            memSetOpenedPlan={memSetOpenedPlan}
          />
        </Box>
      </LoadingSpinner>
    );
  },
);
export default ListPlans;
