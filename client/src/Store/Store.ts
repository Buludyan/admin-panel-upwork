import { eventsMWReducer } from "../Slices/EventsMWSlice";
import { collegesListReducer } from "../Slices/CollegesListSlice";
import { detailsPageReducer } from "../Slices/DetailsPageSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    colleges: collegesListReducer,
    details: detailsPageReducer,
    events: eventsMWReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
