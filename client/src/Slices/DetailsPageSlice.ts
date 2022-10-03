import { AxiosResponse } from "axios";
import { adminPanelApi } from "./../Axios/Axios";
import { IDetails } from "../Interfaces/Interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IDetails = {
  collegeName: "",
  address: {
    addressLine1: "",
    addressLine2: "",
    state: "",
    city: "",
    pinCode: "",
    latitude: "",
    longitude: "",
  },
  logo: "",
  description: "",
  meta: "",
  keywords: [],
  programs: [],
  images: [],
  links: [],
  naacGrade: "",
  nirfReport: "",
  contactNumber: "",
  emailAddress: "",
  events: [],
  teachers: [],
  reports: [],
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
    console.log(details);

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
    setState: (state, action: PayloadAction<string>) => {
      state.address.state = action.payload;
    },
    setDistrict: (state, action: PayloadAction<string>) => {
      state.address.city = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCollegeDetails.fulfilled,
      (state, action: PayloadAction<IDetails>) => {
        state.collegeName = action.payload.collegeName;
        state.address.city = action.payload.address.city;
        state.address.state = action.payload.address.state;
      }
    );
  },
});

export const detailsPageActions = detailsPageSlice.actions;
export const detailsPageReducer = detailsPageSlice.reducer;
