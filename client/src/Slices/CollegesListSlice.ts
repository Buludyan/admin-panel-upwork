import { CollegesIS, ICollege } from "../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CollegesIS = {
  status: "None",
  state: "",
  district: "",
  collegesData: null,
  category: "",
  order: "desc",
};

export const collegesListSlice = createSlice({
  name: "colleges",
  initialState,
  reducers: {
    setSearchStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSearchState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
    setSearchDistrict: (state, action: PayloadAction<string>) => {
      state.district = action.payload;
    },
    setSearchCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setCollegesData: (state, action: PayloadAction<ICollege[]>) => {
      state.collegesData = action.payload;
    },
    setOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload === "asc" ? "desc" : "asc";
    },
  },
});

export const collegesListActions = collegesListSlice.actions;
export const collegesListReducer = collegesListSlice.reducer;
