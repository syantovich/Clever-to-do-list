import { createSlice } from '@reduxjs/toolkit';
import { IWorkMode } from './IWorkMode';

const initialState: IWorkMode = {
  workMode: 0,
  selected: new Date().toISOString().slice(0, 10),
};
export const userSlice = createSlice({
  name: 'workMode',
  initialState,
  reducers: {
    setWorkMode: (state, action) => {
      state.workMode = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { setWorkMode, setSelected } = actions;
