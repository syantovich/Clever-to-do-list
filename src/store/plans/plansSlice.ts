import { createSlice } from '@reduxjs/toolkit';
import { IPlans } from './IPlans';
import processingData from '../../helpers/ProcessingData';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';

const initialState: IPlans = {};

export const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    addPlan: (state, { payload }: { payload: IinfoPlan }) => {
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
    deletePlan: (
      state,
      { payload: { date, id } }: { payload: { date: Date; id: string } },
    ) => {
      let month = processingData.toYearMont(date);
      let day = processingData.getDay(date);
      delete state[month][day][id];
    },
    setPlans: (state, { payload }: { payload: IPlans }) => {
      for (let key in payload) {
        state[key] = payload[key];
      }
    },
    changePlansIsFinished: (
      state,
      {
        payload: { month, day, id, is },
      }: { payload: { month: string; day: string; id: string; is: boolean } },
    ) => {
      state[month][day][id].isFinished = is;
    },
  },
});
const { actions, reducer } = plansSlice;
export default reducer;
export const { setPlans, addPlan, changePlansIsFinished, deletePlan } = actions;
