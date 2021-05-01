import { SET_TYPE_PERIOD } from "../types";

const handlers = {
  [SET_TYPE_PERIOD]: (state, { payload }) => ({
    ...state,
    periodType: payload,
  }),

  DEFAULT: (state) => state,
};

export const expandHeaderReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
