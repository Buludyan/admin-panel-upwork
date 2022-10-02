import { adminPanelApi } from "./../Axios/Axios";
import { DetailsIS } from "../Interfaces/Interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DetailsIS = {
  collegeName: "",
};

export const getCollegeDetails = createAsyncThunk<void, string>(
  "details/getCollegeDetails",
  async function (id, { dispatch }) {
    const collegeDetails = await adminPanelApi.fetchDetails({ id });
    console.log(collegeDetails);
  }
);

export const detailsPageSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.collegeName = action.payload;
    },
  },
});

export const detailsPageActions = detailsPageSlice.actions;
export const detailsPageReducer = detailsPageSlice.reducer;
