import React, { Fragment, useContext } from 'react'
import { Header } from '../components/header/Header'
import { SearchForm } from '../components/search/SearchForm'
import { VkList } from '../components/search/VkList'
import { TelegramList } from '../components/search/TelegramList'
import { YoutubeList } from '../components/search/YoutubeList'
import { BookList } from '../components/search/BookList'
import { PostgresContext } from '../context/postgresql/PostgresContext'

export const Search = () => {
  const { response } = useContext(PostgresContext)
  return (
    <Fragment>
      <Header />
      <div>Search</div>
      <SearchForm />
      <VkList vkItems={response} />
      <TelegramList telegramItems={response} />
      <YoutubeList youtubeItems={response} />
      <BookList bookItems={response} />
    </Fragment>
  )
}
