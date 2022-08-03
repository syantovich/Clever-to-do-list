import { IUser } from '../../Modal/IUser';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUser = {
  name: undefined,
  email: undefined,
  uid: undefined,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
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
