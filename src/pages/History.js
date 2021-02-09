import React, { Fragment, useContext, useEffect, useState } from 'react'
import { HistorySearch } from '../components/history/HistorySearch'
import { PostgresContext } from '../context/postgresql/PostgresContext'
import { HistoryList } from '../components/history/HistoryList'
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
      <HistorySearch filterHistory={filterHistory} />
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <HistoryList history={historyState || history} onRemove={onRemove} />
      )}
    </Fragment>
  )
}
