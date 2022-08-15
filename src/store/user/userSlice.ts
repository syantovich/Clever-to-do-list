import { IUser } from './IUser';
import { createSlice } from '@reduxjs/toolkit';
import { TypeLogin } from './user.type';

const initialState: IUser = {
  name: undefined,
  email: undefined,
  uid: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { payload: { name, email, uid } }: TypeLogin) => {
      state.name = name;
      state.email = email;
      state.uid = uid;
    },
    logout: state => {
      state.name = undefined;
      state.email = undefined;
      state.uid = undefined;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { login, logout } = actions;
