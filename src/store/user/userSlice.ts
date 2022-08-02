import { IUser } from '../../IUser/IUser';
import { createSlice } from '@reduxjs/toolkit';

const initialState: IUser = {
  name: undefined,
  email: undefined,
  isLoading: false,
};
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isLoading = false;
    },
    gettingUser: state => {
      state.isLoading = true;
    },
    logout: state => {
      state.name = undefined;
      state.email = undefined;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { login, logout } = actions;
