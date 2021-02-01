import React, { useReducer } from 'react'
import axios from 'axios'
import { PostgresContext } from './PostgresContext'
import { postgresReducer } from './postgresReducer'
import { SHOW_LOADER, FETCH_HISTORY, REMOVE_HISTORYITEM, SEARCH_QUERY } from '../types'

export const PostgresState = ({ children }) => {
  const initialState = {
    history: [],
    response: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(postgresReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const fetchHistory = async () => {
    showLoader()
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key] }
    })
    dispatch({ type: FETCH_HISTORY, payload })
  }
  const fetchResponse = async (query = null) => {
    showLoader()
    // Пока что query некуда всавлять т.к. запросы идут
    // фековок API
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key], query: query }
    })

    dispatch({ type: SEARCH_QUERY, payload })
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
        fetchResponse,
        loading: state.loading,
        history: state.history,
        response: state.response,
      }}
    >
      {children}
    </PostgresContext.Provider>
  )
}
