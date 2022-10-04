import { IIvent, IDetails } from "./../Interfaces/Interfaces";
import { ChangeEvent } from "react";
import { AxiosResponse } from "axios";
import { adminPanelApi } from "./../Axios/Axios";
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
  links: [
    ["linkedin", ""],
    ["facebook", ""],
    ["instagram", ""],
  ],
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
    setPrograms: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.programs = action.payload.target.value.split(",");
    },
    setPinCode: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.address.pinCode = action.payload.target.value;
    },
    setContact: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.contactNumber = action.payload.target.value;
    },
    setEmail: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.emailAddress = action.payload.target.value;
    },
    setNAAC: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.naacGrade = action.payload.target.value;
    },
    setNIRF: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.nirfReport = action.payload.target.value;
    },
    setDescription: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      state.description = action.payload.target.value;
    },
    setSocial: (
      state,
      action: PayloadAction<ChangeEvent<HTMLInputElement | HTMLTextAreaElement>>
    ) => {
      const { id, value } = action.payload.target;
      state.links = state.links.map((soc): [string, string] =>
        soc[0] === id ? (soc = [soc[0], value]) : soc
      );
    },
    setEvent: (state, action: PayloadAction<IIvent>) => {
      const { title, date, link, image } = action.payload;
      state.events.push([title, date, link, image]);
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
