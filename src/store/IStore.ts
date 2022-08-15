import { IUser } from './user/IUser';
import { IPlans } from './plans/IPlans';
import { IWorkMode } from './workMode/IWorkMode';
import { SwitchGraphType } from './switchGraphs/switchGraph.type';
import { IsLoadingEnum } from './isLoading/isLoadingSlice';

export interface IStore {
  user: IUser;
  isLoading: { is: IsLoadingEnum };
  plans: IPlans;
  workMode: IWorkMode;
  switchGraph: SwitchGraphType;
}
