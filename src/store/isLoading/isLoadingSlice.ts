import { createSlice } from '@reduxjs/toolkit';
import { TypeInitialState, TypeSetIsLoading } from './isLoading.type';

export enum IsLoadingEnum {
  pending = 'pending',
  error = 'rejected',
  success = 'fulfilled',
}
const initialState: TypeInitialState = { is: IsLoadingEnum.pending };
export const Loading = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoading: (state, { payload }: TypeSetIsLoading) => {
      state.is = payload;
    },
  },
});
const { actions, reducer } = Loading;
export default reducer;
export const { setLoading } = actions;
