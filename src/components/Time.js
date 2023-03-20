/** @format */

import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Time(props) {
  const { projects, selectedProjectID } = useSelector(state => state.taskTimer);
  const dispatch = useDispatch();
  let startTime = 0;
  let endTime = 0;
  let timeDiff = 0;
  let total = 0;

  return (
    <div className="inline ">
      <p className="bg-gray-500">
        {props.project.tasks.map(t => {
          console.log(t, `total-time-t`);
          startTime += t.startTime ? t.startTime : 0;
          endTime += t.endTime ? t.endTime : 0;
          timeDiff = endTime ? endTime - startTime : startTime;

          var milliseconds = Math.floor(((endTime - startTime) % 1000) / 100),
            seconds = Math.floor((timeDiff / 1000) % 60),
            minutes = Math.floor((timeDiff / (1000 * 60)) % 60),
            hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

          hours = hours < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          total = `${hours}:${minutes}:${seconds}`;
          return total;
        })}
      </p>
    </div>
  );
}
