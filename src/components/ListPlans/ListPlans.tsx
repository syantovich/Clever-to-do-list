import React, { useEffect, useState } from 'react';
import { ListPlansType } from './ListPlans.type';
import ElementOfListPlans from '../ElementOfListPlans/ElementOfListPlans';
import { IinfoPlan } from '../../Modal/IinfoPlan';
// import { IinfoPlan } from '../../Modal/IinfoPlan';

const ListPlans = ({ plans, setPlans, selected }: ListPlansType) => {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  console.log(setPlans);
  useEffect(() => {
    // console.log(selected.slice(0, 7));
    // console.log(plans);
    let arrOfValues: IinfoPlan[] = Object.values(
      plans[selected.slice(0, 7)][selected.slice(8)],
    );
    let sortedArr = arrOfValues.sort((a, b) => {
      if (a.timeStart === b.timeStart) {
        return b.timeEnd > a.timeEnd ? -1 : 1;
      } else {
        return b.timeStart > a.timeStart ? -1 : 1;
      }
    });
    setElements(
      sortedArr.map(e => {
        return (
          <ElementOfListPlans
            {...e}
            plans={plans}
            setPlans={setPlans}
            addingDate={e.date}
            key={e.id}
            date={
              new Date().toISOString().slice(0, 10) +
              'T' +
              new Date().toLocaleString().slice(12, 17)
            }
          />
        );
      }),
    );
    console.log('----');
    console.log(sortedArr);
  }, [selected, plans]);
  return <div>{elements.length ? elements : 'No plans in this day'}</div>;
};
export default ListPlans;
