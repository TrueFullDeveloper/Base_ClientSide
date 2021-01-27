import React from 'react'

export const SearchForm = () => {
  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Поиск по теме"
        />
        <input 
          value="Поиск" 
          type="submit"
        />
      </div>
    </form>
  )
}