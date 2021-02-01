import React, { Fragment } from 'react'
import { Header } from '../components/header/Header'
import { SearchForm } from '../components/search/SearchForm'

export const Home = () => {
  return (
    <Fragment>
      <Header />
      <SearchForm />
      <div>Home</div>
    </Fragment>
  )
}
