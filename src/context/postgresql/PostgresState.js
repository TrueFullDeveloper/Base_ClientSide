import React, {useReducer} from 'react'
import axios from 'axios'
import {PostgresContext} from './PostgresContext'
import {postgresReducer} from './postgresReducer'
import {SHOW_LOADER, FETCH_HISTORY, REMOVE_HISTORYITEM} from '../types'


export const PostgresState = ({children}) => {
  const initialState = {
    history: [],
    loading: false
  }
  const [state, dispatch] = useReducer(postgresReducer, initialState)

  const showLoader = () => dispatch({type: SHOW_LOADER})

  const fetchHistory = async () => {
    showLoader()
    const payload = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    dispatch({type: FETCH_HISTORY, payload})
  }

  const removeHistoryItem = async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    dispatch({
      type: REMOVE_HISTORYITEM,
      payload: id
    })
  }

  return (
    <PostgresContext.Provider value={{
      showLoader, removeHistoryItem, fetchHistory,
      loading: state.loading,
      history: state.history
    }}>
      {children}
    </PostgresContext.Provider>
  )
}