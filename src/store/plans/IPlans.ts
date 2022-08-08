import { IinfoPlan } from '../../pages/Plans/IinfoPlan';

export interface IPlans {
  [month: string]: { [day: string]: { [id: string]: IinfoPlan } };
}
