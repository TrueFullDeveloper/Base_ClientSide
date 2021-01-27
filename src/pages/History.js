import React, {Fragment} from 'react'
import { Header } from '../components/header/Header'
import { HistorySearchForm } from '../components/history/HistorySearchForm'

export const History = () => {
    return (
      <Fragment>
        <Header/>
        <HistorySearchForm/>
        <div>History</div>
      </Fragment>
    )
}