import { IEditTeacher } from "./../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isActive: false,
  source: "",
  teacherName: "",
  teacherDesignation: "",
  teacherPhoto: "",
  teacherQualification: "",
  teacherDescription: "",
  teacherPapers: "",
  teacherBooks: "",
  teacherId: "",
};

export const teachersMWSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setActiveAddTeacher: (state) => {
      state.isActive = !state.isActive;
      state.source = "add";
      state.teacherName = "";
      state.teacherDesignation = "";
      state.teacherPhoto = "";
      state.teacherQualification = "";
      state.teacherDescription = "";
      state.teacherPapers = "";
      state.teacherBooks = "";
    },
    setActiveEditTeacher: (state, action: PayloadAction<IEditTeacher>) => {
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
      state.isActive = !state.isActive;
      state.source = "edit";
      state.teacherName = name;
      state.teacherDesignation = designation;
      state.teacherPhoto = photo;
      state.teacherQualification = qualification;
      state.teacherDescription = description;
      state.teacherPapers = papers;
      state.teacherBooks = books;
      state.teacherId = id;
    },
    closeEditTeacher: (state) => {
      state.isActive = false;
    },
  },
});

export const teachersMWActions = teachersMWSlice.actions;
export const teachersMWReducer = teachersMWSlice.reducer;
