import { createSlice } from '@reduxjs/toolkit';
import { IWorkMode } from './IWorkMode';

const initialState: IWorkMode = {
  workMode: 0,
  selected: new Date(),
};
export const userSlice = createSlice({
  name: 'workMode',
  initialState,
  reducers: {
    setWorkMode: (state, { payload }: { payload: number }) => {
      state.workMode = payload;
    },
    setSelected: (state, { payload }: { payload: Date }) => {
      state.selected = payload;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { setWorkMode, setSelected } = actions;
