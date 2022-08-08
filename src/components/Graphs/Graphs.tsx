import React, { useEffect, useState } from 'react';
import { GraphsType } from './Graphs.type';
import './Graphs.css';

const Graphs = ({ sortedList }: GraphsType) => {
  console.log(sortedList);
  const size = 1200 / 24;
  const maxHeight = (sortedList.length * 50 || 200) + size;
  const [lines, setLines] = useState<JSX.Element[]>([]);
  const [blocks, setBlocks] = useState<JSX.Element[]>([]);
  useEffect(() => {
    let newLines = [];
    let newBlocks;

    for (let i = 1; i < 24; i++) {
      newLines.push(
        <g key={i * size}>
          <line
            opacity="0.18"
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
            y={size - 5}
            x={i * size + 5}
            stroke="#000"
            fill="#000000">
            {i}
          </text>
        </g>,
      );
    }
    newBlocks = sortedList.map((e, i) => {
      console.log(e);
      const startHour = +e.timeStart.slice(0, 2) + +e.timeStart.slice(3) / 60;
      const endHour = +e.timeEnd.slice(0, 2) + +e.timeEnd.slice(3) / 60;
      let length = endHour - startHour;
      console.log(length);
      return (
        <g key={e.id} className={'block_graphs'}>
          <rect
            rx="15"
            height={size - 10}
            width={length * size}
            y={size * (i + 1)}
            x={startHour * size}
            strokeWidth="4"
            className={`${e.important} ${
              e.isFinished ||
              `${e.date}T${e.timeEnd}` <
                new Date().toISOString().slice(0, 10) +
                  'T' +
                  new Date().toLocaleString().slice(12, 17)
                ? 'opacity_element'
                : ''
            }`}
          />
          <text
            textAnchor="start"
            fontFamily="Noto Sans JP"
            fontSize="12"
            strokeWidth="0"
            y={size * (i + 2) - size / 2}
            x={startHour * size + 2}
            stroke="#000"
            fill="#000000">
            {e.name}
          </text>
        </g>
      );
    });
    setBlocks(newBlocks);
    setLines(newLines);
  }, []);
  return (
    <div className={'timeline'}>
      <svg
        width="1200"
        height={maxHeight}
        xmlns="http://www.w3.org/2000/svg"
        onDragStart={event => event.preventDefault()}>
        <g>
          <line
            id="svg_7"
            y2={size - 5}
            x2="1200"
            y1={size - 5}
            x1="0"
            stroke="#000"
            fill="none"
          />
          {lines}
          {blocks}
        </g>
      </svg>
    </div>
  );
};
export default Graphs;
