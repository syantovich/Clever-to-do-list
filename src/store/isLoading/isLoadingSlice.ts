import { createSlice } from '@reduxjs/toolkit';

export enum IsLoadingEnum {
  pending = 'pending',
  error = 'rejected',
  success = 'fulfilled',
}
const initialState: { is: IsLoadingEnum } = { is: IsLoadingEnum.pending };
export const Loading = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setLoading: (state, { payload }: { payload: IsLoadingEnum }) => {
      state.is = payload;
    },
  },
});
const { actions, reducer } = Loading;
export default reducer;
export const { setLoading } = actions;
