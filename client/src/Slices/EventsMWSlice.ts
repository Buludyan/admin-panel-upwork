import { IIvent } from "./../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  source: "",
  eventTitle: "",
  eventDate: "",
  eventLink: "",
  eventImage: "",
};

export const eventsMWSlice = createSlice({
  name: "colleges",
  initialState,
  reducers: {
    setActiveAdd: (state) => {
      state.isActive = !state.isActive;
      state.source = "add";
      state.eventTitle = "";
      state.eventDate = "";
      state.eventLink = "";
      state.eventImage = "";
    },
    setActiveEdit: (state, action: PayloadAction<IIvent>) => {
      const { title, date, link, image } = action.payload;
      state.isActive = !state.isActive;
      state.source = "edit";
      state.eventTitle = title;
      state.eventDate = date;
      state.eventLink = link;
      state.eventImage = image;
    },
    closeEdit: (state) => {
      state.isActive = false;
    },
  },
});

export const eventsMWActions = eventsMWSlice.actions;
export const eventsMWReducer = eventsMWSlice.reducer;
