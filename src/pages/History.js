import React, { Fragment, useContext, useEffect } from 'react'
import { Header } from '../components/header/Header'
import { HistorySearchForm } from '../components/history/HistorySearchForm'
import { PostgresContext } from '../context/postgresql/PostgresContext'
import { HistoryItem } from '../components/history/HistoryItem'
import { Loader } from '../components/loader/Loader'

export const History = () => {
  const { fetchHistory, history, loading, removeHistoryItem } = useContext(PostgresContext)

  useEffect(() => {
    fetchHistory()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Header />
      <div>History</div>
      <HistorySearchForm />
      {loading ? <Loader /> : <HistoryItem history={history} onRemove={removeHistoryItem} />}
    </Fragment>
  )
}
