/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  selectedProjectID: "",
};

export const projectSlice = createSlice({
  name: "taskTimer",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const { payload } = action;
      // console.log(payload, `add-project-payload`);
      state.projects = [...state.projects, { ...payload }];
      if (!state.selectedProjectID) {
        state.selectedProjectID = payload.id;
      }
    },

    selectActiveProject: (state, action) => {
      const { payload } = action;

      state.selectedProjectID = payload;
    },

    addTask: (state, action) => {
      const { payload } = action;

      const updatedState = state.projects.map(e => {
        // console.log(e, payload, `project-in-task`);
        if (e.id === state.selectedProjectID) {
          e.tasks = [...e.tasks, { ...payload }];
        }
        return e;
      });
      state.projects = updatedState;
      // console.log(updatedState, `updatedState`);
    },

    changeTaskTimerAndStatus: (state, action) => {
      const { payload } = action;
      state.projects = state.projects.map(e => {
        if (e.id === payload.projectId) {
          const taskArr = e.tasks.map(t => {
            if (t.id === payload.taskId) {
              if (payload.status === "start") {
                return {
                  ...t,
                  status: payload.status,
                  startTime: payload.time,
                };
              }
              if (payload.status === "complete") {
                return {
                  ...t,
                  status: payload.status,
                  endTime: payload.time,
                };
              }
            }
            return t;
          });

          return { ...e, tasks: taskArr };
        }
        return e;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProject,
  selectActiveProject,
  addTask,
  changeTaskTimerAndStatus,
} = projectSlice.actions;

export default projectSlice.reducer;
