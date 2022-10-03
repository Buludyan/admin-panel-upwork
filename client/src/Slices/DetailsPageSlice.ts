import { AxiosResponse } from "axios";
import { adminPanelApi } from "./../Axios/Axios";
import { DetailsIS, IDetails } from "../Interfaces/Interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DetailsIS = {
  collegeName: "",
};

export const getCollegeDetails = createAsyncThunk<IDetails, string>(
  "details/getCollegeDetails",
  async function (id, { rejectWithValue }) {
    const collegeDetails: AxiosResponse = await adminPanelApi.fetchDetails({
      id,
    });

    if (!collegeDetails.data) {
      return rejectWithValue("Error");
    }

    const details: IDetails = collegeDetails.data;

    return details;
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
  extraReducers: (builder) => {
    builder.addCase(
      getCollegeDetails.fulfilled,
      (state, action: PayloadAction<IDetails>) => {
        state.collegeName = action.payload.collegeName;
      }
    );
  },
});

export const detailsPageActions = detailsPageSlice.actions;
export const detailsPageReducer = detailsPageSlice.reducer;
