import { configureStore } from "@reduxjs/toolkit";
import { collegesListReducer } from "../Slices/CollegesListSlice";

export const store = configureStore({
  reducer: {
    colleges: collegesListReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
