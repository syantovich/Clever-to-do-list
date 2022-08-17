import { IPlans } from './IPlans';
import { makeAutoObservable } from 'mobx';
import processingData from '../../helpers/ProcessingData';
import { IinfoPlan } from '../../pages/Plans/IinfoPlan';
import { currDayInMonth, daysInMonth, importance } from '../../constants';
import { db } from '../../services/db';
import user from '../user/user';
import isLoading, { IsLoadingEnum } from '../isLoading/isLoading';
import { toast } from 'react-toastify';
import workModeSelected from '../workMode/workModeSelected';

class Plans {
  plans: IPlans = {};

  nextMonth = new Date().getMonth();

  days: { [dateToISOString: string]: Date } = {};

  constructor() {
    makeAutoObservable(this);
  }

  addPlan(payload: IinfoPlan) {
    return toast
      .promise(
        db.updatePlans({ ...payload, email: user.email! }).catch(() => {
          return db.addPlans({ ...payload, email: user.email! });
        }),
        {
          success: 'Plan added',
          error: 'Something wrong',
          pending: 'Loading',
        },
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

  deletePlan(date: Date, id: string) {
    return toast
      .promise(db.deletePlan(user.email!, date!, id), {
        error: 'Save error',
        success: 'deleted',
        pending: 'deleting',
      })
      .then(() => {
        // setOldDate(addingDate);
        // if (setIsEdit) {
        //   setIsEdit(false);
        // }
        // if (setOpenedPlan) {
        //   setOpenedPlan(null);
        // }
        let month = processingData.toYearMont(date);
        let day = processingData.getDay(date);
        delete this.plans[month][day][id];
      });
  }

  addDays() {
    console.log(processingData.getDateWithoutHour(workModeSelected.selected));
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
  }: IinfoPlan) {
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
        { pending: 'Changing', error: 'Error of Change', success: 'Changed' },
      )
      .then(() => {
        this.plans[processingData.toYearMont(date)][
          processingData.getDay(date)
        ][id].isFinished = isFinished;
        return isFinished;
      });
    return false;
  }

  get sortedArrInDate() {
    let month = processingData.toYearMont(workModeSelected.selected);
    let day = processingData.getDay(workModeSelected.selected);
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

  importance(date: Date) {
    let isNotImportant = false,
      isImportant = false,
      isVeryImportant = false;
    const yearMonth = processingData.toYearMont(date);
    const day = processingData.getDay(date);
    if (this.plans[yearMonth]) {
      if (this.plans[yearMonth][day]) {
        isNotImportant = Object.values(this.plans[yearMonth][day]).some(
          e => e.important === importance[0].value,
        );
        isImportant = Object.values(this.plans[yearMonth][day]).some(
          e => e.important === importance[1].value,
        );
        isVeryImportant = Object.values(this.plans[yearMonth][day]).some(
          e => e.important === importance[2].value,
        );
      }
    }

    return { isNotImportant, isImportant, isVeryImportant };
  }
}
export default new Plans();
