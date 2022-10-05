import { IEditEvent } from "./../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  source: "",
  eventTitle: "",
  eventDate: "",
  eventLink: "",
  eventImage: "",
  eventId: "",
};

export const eventsMWSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setActiveAddEvent: (state) => {
      state.isActive = !state.isActive;
      state.source = "add";
      state.eventTitle = "";
      state.eventDate = "";
      state.eventLink = "";
      state.eventImage = "";
    },
    setActiveEditEvent: (state, action: PayloadAction<IEditEvent>) => {
      const { title, date, link, image, id } = action.payload;
      state.isActive = !state.isActive;
      state.source = "edit";
      state.eventTitle = title;
      state.eventDate = date;
      state.eventLink = link;
      state.eventImage = image;
      state.eventId = id;
    },
    closeEditEvent: (state) => {
      state.isActive = false;
    },
  },
});

export const eventsMWActions = eventsMWSlice.actions;
export const eventsMWReducer = eventsMWSlice.reducer;
