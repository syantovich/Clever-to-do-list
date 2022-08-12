import React, { memo } from 'react';
import AddPlan from '../AddPlan/AddPlan';
import ListPlans from '../ListPlans/ListPlans';

const WorkModeProxy = memo(({ workMode }: { workMode: number }) => {
  const elementByWorkMode = [ListPlans, AddPlan];
  const CurrMode = elementByWorkMode[workMode];
  return <CurrMode />;
});
WorkModeProxy.displayName = 'WormModeProxy';
export default WorkModeProxy;
