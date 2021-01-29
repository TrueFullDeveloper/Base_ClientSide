import {SHOW_LOADER, FETCH_HISTORY, REMOVE_HISTORYITEM} from '../types'

const handlers = {
  [SHOW_LOADER]: state => ({...state, loading: true}),
  [FETCH_HISTORY]: (state, {payload}) => ({...state, notes: payload, loading: false}),
  [REMOVE_HISTORYITEM]: (state, {payload}) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== payload)
  }),
  DEFAULT: state => state
}

export const postgresReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}