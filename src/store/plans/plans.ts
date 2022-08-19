import { IPlans } from './IPlans';
import { makeAutoObservable } from 'mobx';
import processingData from '../../helpers/ProcessingData';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import {
  addPlanPromise,
  changingPromise,
  currDayInMonth,
  daysInMonth,
  deletePlanPromise,
} from '../../constants';
import { db } from '../../services/db';
import user from '../user/user';
import isLoading, { IsLoadingEnum } from '../isLoading/isLoading';
import { toast } from 'react-toastify';

class Plans {
  plans: IPlans = {};

  nextMonth: number = new Date().getMonth();

  selected: Date = new Date();

  days: { [dateToISOString: string]: Date } = {};

  constructor() {
    makeAutoObservable(this);
  }

  addPlan(payload: IinfoPlan): Promise<void> {
    return toast
      .promise(
        db.updatePlans({ ...payload, email: user.email! }).catch(() => {
          return db.addPlans({ ...payload, email: user.email! });
        }),
        addPlanPromise,
      )
      .then(() => {
        let month = processingData.toYearMont(payload.date);
        let day = processingData.getDay(payload.date);
        if (!this.plans[month]) {
          this.plans[month] = {};
        }
        if (!this.plans[month][day]) {
          this.plans[month][day] = {};
        }
        this.plans[month][day][payload.id] = payload;
      });
  }

  deletePlan(date: Date, id: string): Promise<void> {
    return toast
      .promise(db.deletePlan(user.email!, date!, id), deletePlanPromise)
      .then(() => {
        let month = processingData.toYearMont(date);
        let day = processingData.getDay(date);
        delete this.plans[month][day][id];
      });
  }

  addDays() {
    console.log(processingData.getDateWithoutHour(this.selected));
    isLoading.setLoading(IsLoadingEnum.pending);
    let year = new Date().getFullYear();
    let startIndex =
      this.nextMonth === new Date().getMonth() ? currDayInMonth() : 1;
    let length = daysInMonth(this.nextMonth + 1, year);
    for (let i = startIndex; i <= length; i++) {
      let date = new Date(year, this.nextMonth, i + 1);
      this.days[date.toISOString()] = date;
      const month = processingData.toYearMont(date);
      const day = processingData.getDay(date);
      if (!this.plans[month]) {
        this.plans[month] = {};
      }

      this.plans[month][day] = {};
    }

    const key = new Date(year, this.nextMonth + 1).toISOString().slice(0, 7);
    db.getPlansOnMonth(user.email!, key)
      .then(result => {
        let res = result.data();
        console.log(res);
        if (res !== undefined) {
          for (let day in res) {
            this.plans[key][day] = res[day];
            for (let id in res[day]) {
              this.plans[key][day][id].date = res[day][id].date.toDate();
              console.log(res[day][id].date.toDate());
            }
          }
        }
        this.nextMonth += 1;
        console.log(Object.values(this.days).length);
      })
      .finally(() => {
        isLoading.setLoading(IsLoadingEnum.success);
      });
  }

  changePlansIsFinished({
    name,
    desc,
    important,
    date,
    timeStart,
    timeEnd,
    id,
    isFinished,
  }: IinfoPlan): boolean {
    toast
      .promise(
        db.updatePlans({
          email: user.email!,
          name,
          desc,
          important,
          date,
          timeStart,
          timeEnd,
          id,
          isFinished,
        }),
        changingPromise,
      )
      .then(() => {
        this.plans[processingData.toYearMont(date)][
          processingData.getDay(date)
        ][id].isFinished = isFinished;
        return isFinished;
      });
    return false;
  }

  get sortedArrInDate(): IinfoPlan[] {
    let month = processingData.toYearMont(this.selected);
    let day = processingData.getDay(this.selected);
    try {
      let arrOfValues: IinfoPlan[] = Object.values(this.plans[month][day]);
      return arrOfValues.sort((a, b) => {
        if (a.timeStart === b.timeStart) {
          return b.timeEnd > a.timeEnd ? -1 : 1;
        } else {
          return b.timeStart > a.timeStart ? -1 : 1;
        }
      });
    } catch (e) {
      return [];
    }
  }

  setSelected(date: Date) {
    this.selected = date;
  }
}
export default new Plans();
