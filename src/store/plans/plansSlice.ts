import { createSlice } from '@reduxjs/toolkit';
import { IPlans } from './IPlans';
import processingData from '../../helpers/ProcessingData';

const initialState: IPlans = {};

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    addPlan: (state, { payload }) => {
      let month = processingData.toYearMont(payload.date);
      let day = processingData.getDay(payload.date);
      if (!state[month]) {
        state[month] = {};
      }
      if (!state[month][day]) {
        state[month][day] = {};
      }
      state[month][day][payload.id] = payload;
    },
    deletePlan: (state, { payload: { date, id } }) => {
      let month = processingData.toYearMont(date);
      let day = processingData.getDay(date);
      delete state[month][day][id];
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
const { actions, reducer } = plansSlice;
export default reducer;
export const { setPlans, addPlan, changePlansIsFinished, deletePlan } = actions;
