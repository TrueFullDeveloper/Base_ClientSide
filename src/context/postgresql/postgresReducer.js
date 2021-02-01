import { SHOW_LOADER, FETCH_HISTORY, REMOVE_HISTORYITEM, SEARCH_QUERY } from '../types'

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [FETCH_HISTORY]: (state, { payload }) => ({
    ...state,
    history: payload,
    loading: false,
  }),
  [REMOVE_HISTORYITEM]: (state, { payload }) => ({
    ...state,
    history: state.history.filter(note => note.id !== payload),
  }),
  [SEARCH_QUERY]: (state, { payload }) => ({
    ...state,
    response: payload,
    loading: false,
  }),

  DEFAULT: state => state,
}

export const postgresReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
