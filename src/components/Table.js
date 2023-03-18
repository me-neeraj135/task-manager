/** @format */

import React from "react";

export default function Table() {
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

          <tr className="items-center bg-slate-200">
            <td className="text-center ">my project</td>
            <td className="text-center   "></td>
            <td className="text-center ">{"Pending"}</td>
            <td className="text-center ">{""}</td>
            <td className="text-center ">{""}</td>
          </tr>

          {/* task row */}
          <tr className="">
            <td className="text-center py-1"></td>
            <td className="text-center py-1 bg-lime-600">my task</td>
            <td className="text-center py-1">
              <select name="" id="" className="rounded-sm  py-2">
                <option value={"pending"} disabled>
                  pending
                </option>
                <option value={"start"}>start</option>
                <option value={"completed"}>compeletd</option>
              </select>
            </td>
            <td className="text-center py-2">00</td>
            <td className="text-center py-2">{""}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
