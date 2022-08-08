import { IUser } from './user/IUser';
import { IPlans } from './plans/IPlans';
import { IWorkMode } from './workMode/IWorkMode';

export interface IStore {
  user: IUser;
  isLoading: { is: boolean };
  plans: IPlans;
  workMode: IWorkMode;
}
