import { IUser } from './user/IUser';
import { IPlans } from './plans/IPlans';
import { IWorkMode } from './workMode/IWorkMode';
import { SwitchGraphType } from './switchGraphs/switchGraph.type';

export interface IStore {
  user: IUser;
  isLoading: { is: boolean };
  plans: IPlans;
  workMode: IWorkMode;
  switchGraph: SwitchGraphType;
}
