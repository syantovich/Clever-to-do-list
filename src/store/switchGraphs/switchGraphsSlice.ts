import { createSlice } from '@reduxjs/toolkit';
import { SwitchGraphType, TypeSetGraph } from './switchGraph.type';

const initialState: SwitchGraphType = {
  isGraphs: false,
};
export const switchGraphs = createSlice({
  name: 'graphs',
  initialState,
  reducers: {
    setGraphs: (state, { payload }: TypeSetGraph) => {
      state.isGraphs = payload;
    },
  },
});
const { actions, reducer } = switchGraphs;
export default reducer;
export const { setGraphs } = actions;
