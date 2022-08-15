import { createSlice } from '@reduxjs/toolkit';
import { IWorkMode } from './IWorkMode';
import { TypeSetSelected, TypeSetWorkMode } from './workMode.type';

const initialState: IWorkMode = {
  workMode: 0,
  selected: new Date(),
};
export const userSlice = createSlice({
  name: 'workMode',
  initialState,
  reducers: {
    setWorkMode: (state, { payload }: TypeSetWorkMode) => {
      state.workMode = payload;
    },
    setSelected: (state, { payload }: TypeSetSelected) => {
      state.selected = payload;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { setWorkMode, setSelected } = actions;
