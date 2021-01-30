import React, { useContext, useState } from 'react'
import { PostgresContext } from '../../context/postgresql/PostgresContext'

export const HistorySearchForm = () => {
  const { searchHistory, history } = useContext(PostgresContext)
  const [value, setValue] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    searchHistory(history.filter((historyItem) => historyItem.title.startsWith(value)))
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          placeholder="Введите название"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Поиск</button>
      </div>
    </form>
  )
}
