import { SET_COORDINATES } from "../types";

const handlers = {
  [SET_COORDINATES]: (state, { payload }) => ({
    ...state,
    convertCoordinates: payload,
  }),

  DEFAULT: (state) => state,
};

export const graphicReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
