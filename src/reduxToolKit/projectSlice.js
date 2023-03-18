/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  activeProjectId: "",
};

export const projectSlice = createSlice({
  name: "taskTimer",
  initialState,
  reducers: {
    addProject: (state, action) => {
      const { payload } = action;
      state.projects = [...state.projects, { payload }];
    },

    addActiveProject: (state, action) => {
      // console.log(state, action, `activepro`);
      const { payload } = action;
      state.activeProjectId = payload;
    },

    addTask: (state, action) => {
      const { payload } = action;
      console.log(state.projects, `adt`);
      const updateState = state.projects.map(e => {
        console.log(e, `sssss`);
        if (e.id === state.activeProjectId) {
          return { ...e, tasks: [...e.tasks, { payload }] };
        }
        return e;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProject, addActiveProject, addTask } = projectSlice.actions;

export default projectSlice.reducer;
