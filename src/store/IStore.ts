import { IUser } from './user/IUser';

export interface IStore {
  user: IUser;
  isLoading: { is: boolean };
}
