import { IUser } from '../../IUser/IUser';

export const userSelector = (state: { user: IUser }) => state.user;
