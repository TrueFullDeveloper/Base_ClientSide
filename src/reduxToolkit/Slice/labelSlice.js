import { createSlice } from "@reduxjs/toolkit";

// TODO: Add Logic for Calculate Coordinates

const labelSlice = createSlice({
  name: "label",
  initialState: {
    visible: false,
    sectorNumber: null,
    coordinates: null,
  },

  reducers: {
    showLabel(state, { payload: { sectorNumber, coordinates } }) {
      state.visible = true;
      state.sectorNumber = sectorNumber;
      state.coordinates = coordinates;
    },

    hideLabel(state) {
      state.visible = false;
    },
  },
});

export const { showLabel, hideLabel } = labelSlice.actions;

export const selectLabel = state => ({
  visible: state.label.visible,
  sectorNumber: state.label.sectorNumber,
  coordinates: state.label.coordinates,
});

export default labelSlice.reducer;
