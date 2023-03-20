/** @format */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import taskReducer from "./projectSlice";

export const store = configureStore({
  reducer: {
    taskTimer: taskReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["taskTimer/changeTaskTimerAndStatus"],
        ignoredActionPaths: [
          "meta.arg",
          "payload.time",
          "taskTimer.projects.0.tasks.0.startTime",
          "taskTimer.projects.0.tasks.0.endTime",
        ],
        ignoredPaths: [
          "items.dates",
          "taskTimer.projects.0.tasks.0.startTime",
          "taskTimer.projects.0.tasks.0.endTime",
          "meta.arg",
          "payload.time",
        ],
      },
    }),
});
