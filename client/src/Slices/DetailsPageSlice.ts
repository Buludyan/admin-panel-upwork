import {
  IIvent,
  IDetails,
  IEditEvent,
  ITeacher,
  IEditTeacher,
  IEditReport,
} from "./../Interfaces/Interfaces";
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
    setImageCheck: (state, action: PayloadAction<number>) => {
      state.images[action.payload][1] === "active"
        ? (state.images[action.payload][1] = "inactive")
        : (state.images[action.payload][1] = "active");
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
      state.events.unshift([title, date, link, image]);
    },
    updateEvent: (state, action: PayloadAction<IEditEvent>) => {
      const { title, date, link, image, id } = action.payload;
      state.events[+id] = [title, date, link, image];
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      const id = +action.payload;
      state.events = state.events.filter((event, idx) => idx !== id);
    },
    setTeacher: (state, action: PayloadAction<ITeacher>) => {
      const {
        name,
        designation,
        photo,
        qualification,
        description,
        papers,
        books,
      } = action.payload;
      state.teachers.unshift([
        name,
        designation,
        photo,
        qualification,
        description,
        papers,
        books,
      ]);
    },
    updateTeacher: (state, action: PayloadAction<IEditTeacher>) => {
      const {
        name,
        designation,
        photo,
        qualification,
        description,
        papers,
        books,
        id,
      } = action.payload;
      state.teachers[+id] = [
        name,
        designation,
        photo,
        qualification,
        description,
        papers,
        books,
      ];
    },
    deleteTeacher: (state, action: PayloadAction<string>) => {
      const id = +action.payload;
      state.teachers = state.teachers.filter((teacher, idx) => idx !== id);
    },
    updateReport: (state, action: PayloadAction<IEditReport>) => {
      const { name, date, link, image, id } = action.payload;
      state.reports[+id] = [name, date, link, image];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCollegeDetails.fulfilled,
      (state, action: PayloadAction<IDetails>) => {
        const {
          collegeName,
          address,
          logo,
          description,
          meta,
          keywords,
          programs,
          images,
          links,
          naacGrade,
          nirfReport,
          contactNumber,
          emailAddress,
          events,
          teachers,
          reports,
        } = action.payload;
        state.collegeName = collegeName;
        state.address.city = address.city;
        state.address.state = address.state;
        state.address.pinCode = address.pinCode;
        state.logo = logo;
        state.description = description;
        state.meta = meta;
        state.keywords = keywords;
        state.programs = programs;
        state.images = images;
        state.links = links;
        state.naacGrade = naacGrade;
        state.nirfReport = nirfReport;
        state.contactNumber = contactNumber;
        state.emailAddress = emailAddress;
        state.events = events;
        state.teachers = teachers;
        state.reports = reports;
      }
    );
  },
});

export const detailsPageActions = detailsPageSlice.actions;
export const detailsPageReducer = detailsPageSlice.reducer;
