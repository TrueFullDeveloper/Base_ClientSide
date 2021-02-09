import React, { useReducer } from 'react'
import axios from 'axios'
import { PostgresContext } from './PostgresContext'
import { postgresReducer } from './postgresReducer'
import {
  SHOW_LOADER,
  FETCH_HISTORY,
  REMOVE_HISTORYITEM,
  SEARCH_QUERY,
  FETCH_PROFILE,
} from '../types'

export const PostgresState = ({ children }) => {
  const initialState = {
    history: [],
    response: [],
    profileData: { userName: '', email: '', telegram: '' },
    loading: false,
  }
  const [state, dispatch] = useReducer(postgresReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const fetchHistory = async () => {
    showLoader()
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    const payload = Object.keys(res.data).map(key => {
      return { ...res.data[key] }
    })
    dispatch({ type: FETCH_HISTORY, payload })
  }
  const fetchResponse = async (query = null) => {
    showLoader()
    // Пока что query некуда всавлять т.к. запросы идут
    // на фековое API
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5')

    const payload = Object.keys(res.data).map(key => {
      return { ...res.data[key], query: query }
    })

    dispatch({ type: SEARCH_QUERY, payload })
  }

  const removeHistoryItem = async id => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)

    dispatch({
      type: REMOVE_HISTORYITEM,
      payload: id,
    })
  }

  const fetchProfile = async userId => {
    try {
      showLoader()

      const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${userId}`)
      // Далее создаю объект, который сервер должен возвратить
      const userData = {
        userName: 'Cezar',
        email: 'wannakillms@gmail.com',
        telegram: '@DieYouWatchCo',
      }
      const payload = { ...userData }

      dispatch({ type: FETCH_PROFILE, payload })
    } catch (e) {
      console.log(e.message)
    }
  }

  const profileChange = async userData => {
    try {
      showLoader()

      await axios.post('https://jsonplaceholder.typicode.com/posts', JSON.stringify(userData))
      const payload = { ...userData }

      dispatch({ type: FETCH_PROFILE, payload })
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <PostgresContext.Provider
      value={{
        showLoader,
        removeHistoryItem,
        fetchHistory,
        fetchResponse,
        fetchProfile,
        profileChange,
        loading: state.loading,
        history: state.history,
        response: state.response,
        profileData: state.profileData,
      }}
    >
      {children}
    </PostgresContext.Provider>
  )
}
