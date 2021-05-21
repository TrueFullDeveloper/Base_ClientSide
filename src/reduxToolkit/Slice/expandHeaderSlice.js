import { createSlice } from "@reduxjs/toolkit";

const expandHeaderSlice = createSlice({
  name: "expandHeader",
  initialState: {
    periodType: "day",
  },

  reducers: {
    setPeriodType(state, { payload }) {
      state.periodType = payload;
    },
  },
});

export const { setPeriodType } = expandHeaderSlice.actions;

export const selectPeriodType = state => state.expandHeader.periodType;

export default expandHeaderSlice.reducer;
