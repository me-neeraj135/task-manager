/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTaskTimerAndStatus } from "../reduxToolKit/projectSlice";
const initialTaskStatus = "pending";

export default function Table() {
  const { projects } = useSelector(state => state.taskTimer);
  const [taskStatus, setTaskStatus] = useState(initialTaskStatus);

  const dispatch = useDispatch();

  console.log(taskStatus, `task-status-in-table`);

  return (
    <div>
      <table class="table table-condensed w-full">
        <thead>
          <tr>
            <th>Project</th>
            <th>Task</th>
            <th>Status</th>
            <th>Duration</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* project  row */}
          {projects.map(p => {
            console.log(p, `p-in-table`);
            return (
              <>
                <tr className="items-center bg-slate-200 ">
                  <td className="text-center ">{p.name}</td>
                  <td className="text-center   ">-</td>
                  <td className="text-center ">{"Pending"}</td>
                  <td className="text-center ">time</td>
                  <td className="text-center ">{p.date}</td>
                </tr>
                {/* task row */}
                {p.tasks
                  ? p.tasks.map(t => {
                      const startTime = new Date(t?.startTime).getTime();
                      const endTime = new Date(t?.endTime).getTime();
                      console.log("startTime", startTime, endTime);

                      var milliseconds = Math.floor(
                          ((endTime - startTime) % 1000) / 100
                        ),
                        seconds = Math.floor(
                          ((endTime - startTime) / 1000) % 60
                        ),
                        minutes = Math.floor(
                          ((endTime - startTime) / (1000 * 60)) % 60
                        ),
                        hours = Math.floor(
                          ((endTime - startTime) / (1000 * 60 * 60)) % 24
                        );

                      hours = hours < 10 ? "0" + hours : hours;
                      minutes = minutes < 10 ? "0" + minutes : minutes;
                      seconds = seconds < 10 ? "0" + seconds : seconds;
                      return (
                        <>
                          <tr className=" ">
                            <td className="text-center py-1">-</td>
                            <td className="text-center py-1 ">{t.name}</td>
                            <td className="text-center py-1">
                              <select
                                name={p.id}
                                id={t.id}
                                className="rounded-sm  py-2"
                                onChange={e => {
                                  dispatch(
                                    changeTaskTimerAndStatus({
                                      status: e.target.value,
                                      time: new Date(),
                                      projectId: p.id,
                                      taskId: t.id,
                                    })
                                  );
                                }}
                              >
                                <option value={"pending"} disabled selected>
                                  pending
                                </option>
                                <option value={"start"}>start</option>
                                <option value={"complete"}>complete</option>
                              </select>
                            </td>
                            <td className="text-center py-2">hh/mm/ss/ms</td>
                            <td className="text-center py-2">{t.date}</td>
                          </tr>
                        </>
                      );
                    })
                  : `no-task`}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
