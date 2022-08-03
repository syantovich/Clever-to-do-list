import { IUser } from '../../Modal/IUser';

export const userSelector = (state: { user: IUser }) => state.user;
