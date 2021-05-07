import { SET_ANGLES, EXPAND_DIAGRAM } from "../types";

const handlers = {
  [SET_ANGLES]: (state, { payload }) => ({
    ...state,
    digramAngles: payload,
    isExpand: false,
  }),

  [EXPAND_DIAGRAM]: (state) => ({
    ...state,
    isExpand: true,
  }),

  DEFAULT: (state) => state,
};

export const diagramReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
