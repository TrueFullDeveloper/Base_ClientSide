import React from 'react'

export const HistorySearchForm = () => {
  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Поиск по названию"
        />
        <input 
          value="Поиск" 
          type="submit"
        />
      </div>
    </form>
  )
}
