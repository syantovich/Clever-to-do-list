import React, { memo } from 'react';
import AddPlan from '../AddPlan/AddPlan';
import ListPlans from '../ListPlans/ListPlans';
import { observer } from 'mobx-react-lite';

const WorkModeProxy = memo(
  observer(
    ({
      workMode,
      isGraph,
      setIsGraph,
    }: {
      workMode: number;
      isGraph: boolean;
      setIsGraph: React.Dispatch<React.SetStateAction<boolean>>;
    }) => {
      const elementByWorkMode = [ListPlans, AddPlan];
      const CurrMode = elementByWorkMode[workMode];
      return <CurrMode setIsGraph={setIsGraph} isGraph={isGraph} />;
    },
  ),
);
WorkModeProxy.displayName = 'WormModeProxy';
export default WorkModeProxy;
