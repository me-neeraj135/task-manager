/** @format */

import React, { useState } from "react";

import Model from "./Model";
import { useSelector, useDispatch } from "react-redux";
import {
  addProject,
  addActiveProject,
  addTask,
} from "../reduxToolKit/projectSlice";

import { v4 as uuidv4 } from "uuid";

const currentDate = new Date().toLocaleString(); // 11/16/2015, 11:18:48 PM

const projectInitialState = {
  id: "",
  name: "",
  tasks: [],
  date: "",
};

const taskInitialState = {
  id: "",
  name: "",
  status: "pending",
  startTime: "",
  endTime: "",
  date: "",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(taskInitialState);
  const [project, setProject] = useState(projectInitialState);

  const { projects, activeProjectId } = useSelector(state => state.taskTimer);
  const dispatch = useDispatch();

  console.log(projects, activeProjectId, `use`);

  console.log(task, `add task`);

  // handle popup
  const handleShowModel = () => {
    setOpen(prevState => !prevState);
  };

  // handle project
  const handleProject = (key, value) => {
    setProject({ ...project, [key]: value, id: uuidv4(), date: currentDate });
  };

  // handle task
  const handleTask = (key, value) => {
    setTask({ ...task, [key]: value, id: uuidv4(), date: currentDate });
  };

  return (
    <>
      <div className="flex justify-center  items-center ">
        <div>
          <button
            className="bg-sky-500 hover:bg-sky-700 rounded-sm px-[2rem] py-2  text-fuchsia-50 capitalize"
            onClick={handleShowModel}
          >
            add task
          </button>
        </div>
        <div>
          <select
            name=""
            id=""
            className="w-[20rem]  rounded-sm  py-2 mx-[1rem]"
          >
            {projects.map(({ payload }) => {
              return (
                <>
                  <option value="" key={payload.id}>
                    {payload.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div>
          <button className="bg-red-500  hover:bg-red-700 rounded-sm px-[2rem] py-2  text-fuchsia-50 capitalize">
            delete project
          </button>
        </div>
      </div>
      {open && (
        <Model handleShowModel={handleShowModel}>
          <div
            className=" bg-slate-100 p-7 rounded-sm relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center ">
              <h2 className="capitalize text-lg  font-bold ">add task</h2>
            </div>
            {/* project */}
            <div>
              {/* select project */}
              <div>
                <h2 className="capitalize text-base  "> project</h2>

                <select
                  name=""
                  id=""
                  className="min-w-full p-2"
                  onChange={e => {
                    dispatch(addActiveProject(e.target.value));
                  }}
                >
                  {projects.map(({ payload }) => {
                    {
                      console.log(payload, `add project`);
                    }
                    return (
                      <>
                        <option key={payload.id} value={payload.id}>
                          {payload.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>

              {/* add project */}
              <div className="my-2">
                <h2 className="capitalize text-base ">add project</h2>
                <input
                  type="text"
                  placeholder="project name"
                  className="min-w-full my-2 p-2 "
                  onChange={e => handleProject("name", e.target.value)}
                  value={project.name && project.name}
                />{" "}
                <br />
                <button
                  className="bg-sky-500 hover:bg-sky-700 rounded-sm px-[2rem] py-2 capitalize text-fuchsia-50"
                  onClick={() => {
                    if (project.name) {
                      dispatch(addProject(project));
                      setProject(projectInitialState);
                    }
                  }}
                >
                  {" "}
                  add project
                </button>
              </div>
            </div>

            {/* add new task */}
            <div className="">
              <h2 className="capitalize text-base ">task</h2>
              <input
                type="text"
                placeholder="task name"
                className="min-w-full my-2  p-2"
                onChange={e => handleTask("name", e.target.value)}
              />{" "}
              <br />
              <button
                className="bg-sky-500 hover:bg-sky-700 rounded-sm px-[2rem] py-2  text-fuchsia-50"
                onClick={() => {
                  if (task.name) {
                    dispatch(addTask(task));
                  }
                }}
              >
                {" "}
                add task
              </button>
            </div>
          </div>
        </Model>
      )}
    </>
  );
}
