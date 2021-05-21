import { createSlice } from "@reduxjs/toolkit";

const diagramSlice = createSlice({
  name: "diagram",
  initialState: {
    digramAngles: [],
    isExpand: false,
  },

  reducers: {
    setAngles(state, { payload }) {
      state.digramAngles = payload;
      state.isExpand = false;
    },

    expandDiagram(state) {
      state.isExpand = true;
    },
  },
});

export const { setAngles, expandDiagram } = diagramSlice.actions;

export const selectDiagramAngles = state => state.diagram.digramAngles;
export const selectDiagramExpandStatus = state => state.diagram.isExpand;

export default diagramSlice.reducer;
