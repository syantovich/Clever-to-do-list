import { createSlice } from '@reduxjs/toolkit';
import { IPlans } from './IPlans';

const initialState: IPlans = {};

export const userSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    addPlan: (state, action) => {
      if (!state[action.payload.date.slice(0, 7)]) {
        state[action.payload.date.slice(0, 7)] = {};
      }
      if (
        !state[action.payload.date.slice(0, 7)][action.payload.date.slice(8)]
      ) {
        state[action.payload.date.slice(0, 7)][action.payload.date.slice(8)] =
          {};
      }
      state[action.payload.date.slice(0, 7)][action.payload.date.slice(8)][
        action.payload.id
      ] = action.payload;
    },
    deletePlan: (state, action) => {
      delete state[action.payload.date.slice(0, 7)][
        action.payload.date.slice(8)
      ][action.payload.id];
    },
    setPlans: (state, action) => {
      for (let key in action.payload) {
        state[key] = action.payload[key];
      }
    },
    changePlansIsFinished: (state, action) => {
      state[action.payload.month][action.payload.day][
        action.payload.id
      ].isFinished = action.payload.is;
    },
  },
});
const { actions, reducer } = userSlice;
export default reducer;
export const { setPlans, addPlan, changePlansIsFinished, deletePlan } = actions;
