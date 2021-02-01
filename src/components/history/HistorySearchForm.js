import React, { useState } from 'react'

export const HistorySearchForm = ({ filterHistory }) => {
  const [value, setValue] = useState('')

  const clickHandler = (event) => {
    event.preventDefault()
    filterHistory(value)
  }

  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Введите название"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={clickHandler} type="submit">
          Поиск
        </button>
      </div>
    </form>
  )
}
