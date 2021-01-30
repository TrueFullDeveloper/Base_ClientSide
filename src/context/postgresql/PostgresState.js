import React, { useReducer } from 'react'
import axios from 'axios'
import { PostgresContext } from './PostgresContext'
import { postgresReducer } from './postgresReducer'
import { SHOW_LOADER, SHOW_HISTORY, REMOVE_HISTORYITEM } from '../types'

export const PostgresState = ({ children }) => {
  const initialState = {
    history: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(postgresReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const searchHistory = (payload) => dispatch({ type: SHOW_HISTORY, payload })

  const fetchHistory = async () => {
    showLoader()
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key] }
    })
    dispatch({ type: SHOW_HISTORY, payload })
  }

  const removeHistoryItem = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    dispatch({
      type: REMOVE_HISTORYITEM,
      payload: id,
    })
  }

  return (
    <PostgresContext.Provider
      value={{
        showLoader,
        removeHistoryItem,
        fetchHistory,
        searchHistory,
        loading: state.loading,
        history: state.history,
      }}
    >
      {children}
    </PostgresContext.Provider>
  )
}
