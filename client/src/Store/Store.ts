import { collegeDataReducer } from "../Slices/CollegeDataSlice";
import { eventsMWReducer } from "../Slices/EventsMWSlice";
import { collegesListReducer } from "../Slices/CollegesListSlice";
import { detailsPageReducer } from "../Slices/DetailsPageSlice";
import { configureStore } from "@reduxjs/toolkit";
import { teachersMWReducer } from "../Slices/TeachersMWSlice";
import { reportsMWReducer } from "../Slices/ReportsMWSlice";

export const store = configureStore({
  reducer: {
    colleges: collegesListReducer,
    college: collegeDataReducer,
    details: detailsPageReducer,
    events: eventsMWReducer,
    teachers: teachersMWReducer,
    reports: reportsMWReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
