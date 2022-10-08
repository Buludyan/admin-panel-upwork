import { ICollege, ITime } from "../Interfaces/Interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectChangeEvent } from "@mui/material";
import { adminPanelApi } from "../Axios/Axios";
import { AxiosResponse } from "axios";

const initialState: ICollege = {
  collegename: "",
  SpecialisedIn: "",
  status: "",
  lastModified: { timeToShow: "", ms: 0 },
};

export const getCollegeData = createAsyncThunk<ICollege, string>(
  "college/getCollegeData",
  async function (id, { rejectWithValue }) {
    const collegeData: AxiosResponse = await adminPanelApi.fetchCollege({
      id,
    });

    if (!collegeData.data) {
      return rejectWithValue("Error");
    }

    const data: ICollege = collegeData.data;

    return data;
  }
);

export const collegeDataSlice = createSlice({
  name: "college",
  initialState,
  reducers: {
    setCollegeName: (state, action: PayloadAction<string>) => {
      state.collegename = action.payload;
    },
    setSpecialisedIn: (
      state,
      action: PayloadAction<SelectChangeEvent<string[]> | string>
    ) => {
      if (typeof action.payload === "string") {
        state.SpecialisedIn = action.payload;
      } else {
        const {
          target: { value },
        } = action.payload;
        state.SpecialisedIn =
          typeof value === "string" ? value : value.join(",");
      }
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setLastModified: (state, action: PayloadAction<ITime>) => {
      state.lastModified = action.payload;

      console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCollegeData.fulfilled,
      (state, action: PayloadAction<ICollege>) => {
        const { collegename, SpecialisedIn, status, lastModified } =
          action.payload;
        state.collegename = collegename;
        state.SpecialisedIn = SpecialisedIn;
        state.status = status;
        state.lastModified = lastModified;
      }
    );
  },
});

export const collegeDataActions = collegeDataSlice.actions;
export const collegeDataReducer = collegeDataSlice.reducer;
