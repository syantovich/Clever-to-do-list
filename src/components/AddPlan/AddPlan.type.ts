import { IinfoPlan } from '../../pages/Plans/IinfoPlan';

export type AddPlanType = {
  defaultObj?: IinfoPlan | undefined;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenedPlan?: React.Dispatch<React.SetStateAction<IinfoPlan | null>>;
};
