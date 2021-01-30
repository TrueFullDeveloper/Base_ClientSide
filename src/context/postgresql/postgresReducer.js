import { SHOW_LOADER, SHOW_HISTORY, REMOVE_HISTORYITEM } from '../types'

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [SHOW_HISTORY]: (state, { payload }) => ({
    ...state,
    history: payload,
    loading: false,
  }),
  [REMOVE_HISTORYITEM]: (state, { payload }) => ({
    ...state,
    history: state.history.filter((note) => note.id !== payload),
  }),
  // [HISTORY_SEARCH]: (state, { payload }) => ({
  //   ...state,
  //   history: state.history.filter((note) => note.id !== payload),
  // }),
  DEFAULT: (state) => state,
}

export const postgresReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
