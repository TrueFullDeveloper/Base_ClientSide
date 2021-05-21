import { createSlice } from "@reduxjs/toolkit";

const graphicSlice = createSlice({
  name: "graphic",
  initialState: {
    convertCoordinates: [],
  },

  reducers: {
    setCoordinates(state, { payload }) {
      state.convertCoordinates = payload;
    },
  },
});

export const { setCoordinates } = graphicSlice.actions;

export const selectCoordinates = state => state.graphic.convertCoordinates;

export default graphicSlice.reducer;
