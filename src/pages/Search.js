import React, { Fragment } from 'react'
import { Header } from '../components/header/Header'
import { SearchForm } from '../components/search/SearchForm'

export const Search = () => {
  return (
    <Fragment>
      <Header />
      <div>Search</div>
      <SearchForm />
      {/* <VkList vkItems={} />
      <TelegramList telegramItems={} />
      <YoutubeList youtubeItems={} />
      <BookList bookItems={} /> */}
    </Fragment>
  )
}
