import { HIDE_LABEL, SHOW_LABEL } from "../types";

const handlers = {
  [SHOW_LABEL]: (state, { payload }) => ({
    ...state,
    sectorNumber: payload.sectorNumber,
    coordinates: payload.coordinates,
    color: payload.color,
    visible: true,
  }),

  [HIDE_LABEL]: (state) => ({
    ...state,
    visible: false,
  }),

  DEFAULT: (state) => state,
};

export const labelReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
