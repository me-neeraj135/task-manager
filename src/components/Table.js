/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTaskTimerAndStatus } from "../reduxToolKit/projectSlice";
// const initialTaskStatus = "pending";
import Time from "./Time";

export default function Table() {
  const { projects } = useSelector(state => state.taskTimer);
  const dispatch = useDispatch();

  return (
    <div>
      <table className="table table-condensed w-full">
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
            {
              /* console.log(p, `p-in-table`); */
            }
            return (
              <>
                <tr className="items-center bg-slate-200 ">
                  <td className="text-center ">{p.name}</td>
                  <td className="text-center   ">-</td>
                  <td className="text-center "></td>
                  <td className="text-center ">{<Time project={p} />}</td>
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
                                      time: Date.now(),
                                      projectId: p.id,
                                      taskId: t.id,
                                    })
                                  );
                                }}
                              >
                                <option
                                  value={"pending"}
                                  disabled
                                  selected={t.status === "pending"}
                                >
                                  pending
                                </option>
                                <option
                                  value={"start"}
                                  selected={t.status === "start"}
                                  disabled={t.status === "complete"}
                                >
                                  start
                                </option>
                                <option
                                  value={"complete"}
                                  selected={t.status === "complete"}
                                  disabled={t.status === "pending"}
                                >
                                  complete
                                </option>
                              </select>
                            </td>
                            <td className="text-center py-2">{`${hours || 0}:${
                              minutes || 0
                            }:${seconds || 0}`}</td>

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
