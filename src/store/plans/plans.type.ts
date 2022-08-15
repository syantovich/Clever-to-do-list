import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import { IPlans } from './IPlans';

export type TypeAddPlan = { payload: IinfoPlan };
export type TypeDeletePlan = { payload: { date: Date; id: string } };
export type TypeSetPlans = { payload: IPlans };
export type TypeChangeIsFinished = {
  payload: { month: string; day: string; id: string; is: boolean };
};
