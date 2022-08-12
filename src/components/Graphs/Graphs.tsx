import React, { useEffect, useState } from 'react';
import { GraphsType } from './Graphs.type';
import './Graphs.css';

const Graphs = ({ sortedList, setOpenedPlan }: GraphsType) => {
  const size = 1200 / 24;
  const currentTime = new Date().toLocaleString().slice(12, 17);
  const currentDate = new Date().toISOString().slice(0, 10);
  const maxHeight =
    sortedList.length > 6 ? sortedList.length * size + size : size * 7;
  const [lines, setLines] = useState<JSX.Element[]>([]);
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let newLines = [];
    let newBlocks;

    for (let i = 1; i < 24; i++) {
      newLines.push(
        <g key={i * size}>
          <line
            opacity="0.1"
            y2={maxHeight}
            x2={i * size}
            y1="0"
            x1={i * size}
            stroke="#000"
            fill="none"
          />
          <text
            textAnchor="start"
            fontFamily="Noto Sans JP"
            fontSize="12"
            strokeWidth="0"
            y={size - 15}
            x={i * size + 5}
            stroke="#000"
            fill="#000000">
            {`${i}:00`}
          </text>
        </g>,
      );
    }
    newBlocks = sortedList.map((e, i) => {
      const startHour = +e.timeStart.slice(0, 2) + +e.timeStart.slice(3) / 60;
      const endHour = +e.timeEnd.slice(0, 2) + +e.timeEnd.slice(3) / 60;
      let length = endHour - startHour;

      return (
        <div
          key={e.id}
          style={{
            height: `${size - 5}px`,
            width: `${length * size}px`,
            top: `${size * (i + 1)}px`,
            left: `${startHour * size}px`,
          }}
          className={`block_graphs ${e.important} ${
            e.isFinished ||
            `${e.date}T${e.timeEnd}` < currentDate + 'T' + currentTime
              ? 'opacity_element'
              : ''
          }`}
          onClick={() => {
            setOpenedPlan({
              id: e.id,
              name: e.name,
              desc: e.desc,
              important: e.important,
              date: e.date,
              timeStart: e.timeStart,
              timeEnd: e.timeEnd,
              isFinished: e.isFinished,
            });
          }}>
          {e.name.split(' ').join('\u00A0')}
        </div>
      );
    });
    setBlocks(newBlocks);
    setLines(newLines);
  }, []);
  return (
    <div className={'timeline'}>
      <svg
        width="2400"
        height={maxHeight}
        xmlns="http://www.w3.org/2000/svg"
        onDragStart={event => event.preventDefault()}
        preserveAspectRatio="none">
        <g>
          {lines}

          <line
            className={'current_line'}
            y2={size - 5}
            x2="1200"
            y1={size - 5}
            x1="0"
            stroke="#000"
            fill="none"
          />
        </g>
      </svg>{' '}
      {sortedList.length && sortedList[0].date === new Date(currentDate) && (
        <div
          className={'current_line'}
          style={{
            height: `${maxHeight}px`,
            left: `${
              (+currentTime.slice(0, 2) + +currentTime.slice(3) / 60) * size
            }px`,
          }}
        />
      )}
      {blocks}
    </div>
  );
};
export default Graphs;
