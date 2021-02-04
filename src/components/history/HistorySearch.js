import React, { useState } from 'react'

export const HistorySearch = ({ filterHistory }) => {
  const [value, setValue] = useState('')

  const onClick = event => {
    event.preventDefault()
    filterHistory(value)
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Введите название"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onClick} type="submit">
        Поиск
      </button>
    </div>
  )
}
