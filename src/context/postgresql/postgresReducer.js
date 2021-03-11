import {
  SHOW_LOADER,
  FETCH_HISTORY,
  REMOVE_HISTORYITEM,
  SEARCH_QUERY,
  FETCH_PROFILE,
  HIDE_LOADER,
  SET_COD,
  FETCH_TOP_QUERIES,
} from '../types'

const handlers = {
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [HIDE_LOADER]: state => ({ ...state, loading: false }),
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
  [FETCH_PROFILE]: (state, { payload }) => ({
    ...state,
    profileData: payload,
    loading: false,
  }),
  [SET_COD]: (state, { payload }) => ({
    ...state,
    cod: payload,
    loading: false,
  }),
  [FETCH_TOP_QUERIES]: (state, { payload }) => ({
    ...state,
    queries: payload.queries,
    graphicData: payload.graphicData,
    loading: false,
  }),
  DEFAULT: state => state,
}

export const postgresReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}
