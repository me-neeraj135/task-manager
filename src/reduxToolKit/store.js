/** @format */
import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./projectSlice";
export const store = configureStore({
  reducer: {
    taskTimer: taskReducer,
  },
});
