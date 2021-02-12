import React, { useReducer, useCallback, useEffect } from 'react'
import axios from 'axios'
import { authReducer } from './authReducer'
import { SHOW_LOADER, USER_LOGIN, USER_LOGOUT } from '../types'
import { AuthContext } from './AuthContext'

const storageName = 'UserData'

export const AuthState = ({ children, setAuthenticated }) => {
  const initialState = {
    token: null,
    userId: null,
    password: null,
  }
  const [state, dispatch] = useReducer(authReducer, initialState)

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const login = useCallback(
    (jwtToken, id, password) => {
      showLoader()
      const payload = { token: jwtToken, id, password: password }

      localStorage.setItem(
        storageName,
        JSON.stringify({
          id: id,
          token: jwtToken,
          password: password,
        })
      )
      setAuthenticated(true)

      dispatch({ type: USER_LOGIN, payload })
    },
    [setAuthenticated]
  )

  const logout = useCallback(() => {
    showLoader()
    localStorage.removeItem(storageName)
    setAuthenticated(false)

    dispatch({ type: USER_LOGOUT })
  }, [setAuthenticated])

  const fetchLogin = async userData => {
    try {
      showLoader()

      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        JSON.stringify(userData)
      )

      const payload = { ...res.data, token: 'ddddddddddddsdssd' }

      login(payload.token, payload.id, userData.password)
    } catch (e) {
      console.log(e.message)
    }
  }

  const fetchSignup = async userData => {
    try {
      showLoader()

      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        JSON.stringify(userData)
      )

      const payload = { ...res.data, token: 'ddddddddddddsdssd' }

      login(payload.token, payload.id, payload.password)
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    showLoader()
    const userData = JSON.parse(localStorage.getItem(storageName))

    if (userData && userData.token) {
      login(userData.token, userData.id, userData.password)
    }
  }, [login])

  return (
    <AuthContext.Provider
      value={{
        fetchLogin,
        fetchSignup,
        logout,
        userId: state.userId,
        loading: state.loading,
        password: state.password,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
