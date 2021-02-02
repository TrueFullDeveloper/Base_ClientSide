import React, { Fragment, useContext, useEffect, useState } from 'react'
import { HistorySearchForm } from '../components/history/HistorySearchForm'
import { PostgresContext } from '../context/postgresql/PostgresContext'
import { HistoryItem } from '../components/history/HistoryItem'
import { Loader } from '../components/loader/Loader'

export const History = () => {
  const { fetchHistory, history, loading, removeHistoryItem } = useContext(PostgresContext)
  const [historyState, setHistory] = useState(false) // Издалека похоже на костыль(

  useEffect(() => {
    fetchHistory()
    // eslint-disable-next-line
  }, [])

  const filterHistory = value => {
    setHistory(history.filter(historyItem => historyItem.title.startsWith(value)))
  }

  const onRemove = id => {
    setHistory(history.filter(historyItem => historyItem.id !== id))

    removeHistoryItem(id)
  }

  return (
    <Fragment>
      <div>History</div>
      <HistorySearchForm filterHistory={filterHistory} />
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <HistoryItem history={historyState || history} onRemove={onRemove} />
      )}
    </Fragment>
  )
}
