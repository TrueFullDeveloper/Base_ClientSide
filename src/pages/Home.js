import React, { Fragment, useContext } from 'react'
import { SearchForm } from '../components/search/SearchForm'
import { AuthContext } from '../context/auth/AuthContext'

export const Home = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Fragment>
      <SearchForm />
      <div>Home</div>
      <button onClick={logout}>Выйти</button>
    </Fragment>
  )
}
