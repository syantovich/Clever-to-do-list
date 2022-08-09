import { createSlice } from '@reduxjs/toolkit';
import { SwitchGraphType } from './switchGraph.type';

const initialState: SwitchGraphType = {
  isGraphs: false,
};
export const switchGraphs = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    setGraphs: (state, action) => {
      state.isGraphs = action.payload;
    },
  },
});
const { actions, reducer } = switchGraphs;
export default reducer;
export const { setGraphs } = actions;
