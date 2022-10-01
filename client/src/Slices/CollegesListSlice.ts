import { InitialState, ICollege } from "../Interfaces/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialState = {
  collegesData: null,
};

export const collegesListSlice = createSlice({
  name: "colleges",
  initialState,
  reducers: {
    setCollegesData: (state, action: PayloadAction<ICollege[]>) => {
      state.collegesData = action.payload;
    },
  },
});

export const collegesListActions = collegesListSlice.actions;
export const collegesListReducer = collegesListSlice.reducer;
