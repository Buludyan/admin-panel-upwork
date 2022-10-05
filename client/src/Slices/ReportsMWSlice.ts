import { IEditReport } from "./../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  reportName: "",
  reportDate: "",
  reportLink: "",
  reportImage: "",
  reportId: "",
};

export const reportsMWSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setActiveEditReport: (state, action: PayloadAction<IEditReport>) => {
      const { name, date, link, image, id } = action.payload;
      state.isActive = !state.isActive;
      state.reportName = name;
      state.reportDate = date;
      state.reportLink = link;
      state.reportImage = image;
      state.reportId = id;
    },
    setEditReport: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const reportsMWActions = reportsMWSlice.actions;
export const reportsMWReducer = reportsMWSlice.reducer;
