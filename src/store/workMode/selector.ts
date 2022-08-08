import { IWorkMode } from './IWorkMode';

export const getWorkMode = (state: { workMode: IWorkMode }) =>
  state.workMode.workMode;
export const getSelected = (state: { workMode: IWorkMode }) =>
  state.workMode.selected;
