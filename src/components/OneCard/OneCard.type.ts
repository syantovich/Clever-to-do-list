import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
export type OneCardType = {
  name: string;
  id: string;
  desc: string;
  important: string;
  addingDate: Date;
  timeStart: string;
  timeEnd: string;
  isFinished: boolean;
  setOpenedPlan: React.Dispatch<React.SetStateAction<IinfoPlan | null>>;
  date: string;
};
