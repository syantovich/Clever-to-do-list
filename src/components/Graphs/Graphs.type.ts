import { IinfoPlan } from '../../pages/Plans/IinfoPlan';

export type GraphsType = {
  sortedList: IinfoPlan[];
  setOpenedPlan: React.Dispatch<React.SetStateAction<IinfoPlan | null>>;
};
