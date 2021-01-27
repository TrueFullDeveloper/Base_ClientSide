import React, {Fragment} from 'react'
import { Header } from '../components/header/Header'
import { TelegramList } from '../components/search/TelegramList'


export const Home = () => {
  return (
    <Fragment>
      <Header/>
      <div>Home</div>
      <TelegramList />
    </Fragment>
  )
}