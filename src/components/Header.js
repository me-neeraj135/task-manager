/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Model from "./Model";
import { v4 as uuidv4 } from "uuid";

import {
  addProject,
  selectActiveProject,
  addTask,
  deleteProject,
} from "../reduxToolKit/projectSlice";

// 11/16/2015, 11:18:48 PM

const initialStateOfProject = {
  name: "",
  tasks: [],
  date: "",
};

const initialStateOfTask = {
  name: "",
  status: "pending",
  startTime: "",
  endTime: "",
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(initialStateOfTask);
  const [project, setProject] = useState(initialStateOfProject);
  const [deleteID, setDeleteID] = useState(null);

  const { projects, selectedProjectID } = useSelector(state => state.taskTimer);
  const dispatch = useDispatch();

  // handle popup
  const handleShowModel = () => {
    setOpen(prevState => !prevState);
  };

  // handle project
  const handleProject = (key, value) => {
    setProject(pre => {
      return { ...pre, [key]: value };
    });
  };
  // delete project
  const handleChangeDelete = value => {
    console.log(value, `id-delete-change`);
    setDeleteID(value);
  };

  const handleDeleteProject = () => {
    if (deleteID) {
      dispatch(deleteProject(deleteID));
    }
  };

  // handle task
  const handleTask = (key, value) => {
    setTask({ ...task, [key]: value });
  };
  // console.log(task, `handle-task`);

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
            onChange={e => {
              handleChangeDelete(e.target.value);
            }}
          >
            <option value="" selected>
              select project
            </option>
            {projects.map(e => {
              return (
                <>
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>

        <div>
          <button
            className="bg-red-500  hover:bg-red-700 rounded-sm px-[2rem] py-2  text-fuchsia-50 capitalize"
            onClick={handleDeleteProject}
          >
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
                    dispatch(selectActiveProject(e.target.value));
                  }}
                >
                  <option value="" selected disabled>
                    select project
                  </option>
                  {projects.map(e => {
                    return (
                      <>
                        <option key={e.id} value={e.id}>
                          {e.name}
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
                      dispatch(
                        addProject({
                          id: uuidv4(),
                          ...project,
                          date: new Date().toLocaleString(),
                        })
                      );
                      setProject(initialStateOfProject);
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
                value={task.name && task.name}
              />{" "}
              <br />
              <button
                key={uuidv4()}
                className="bg-sky-500 hover:bg-sky-700 rounded-sm px-[2rem] py-2  text-fuchsia-50"
                onClick={() => {
                  if (task.name) {
                    dispatch(
                      addTask({
                        id: uuidv4(),
                        ...task,
                        date: new Date().toLocaleString(),
                      })
                    );
                    setTask(initialStateOfTask);
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
