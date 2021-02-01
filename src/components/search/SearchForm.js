import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { PostgresContext } from '../../context/postgresql/PostgresContext'

export const SearchForm = () => {
  const { fetchResponse } = useContext(PostgresContext)
  const [value, setValue] = useState('')

  const submitHandler = event => {
    event.preventDefault()
    fetchResponse(value)
  }

  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Поиск по теме"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" onClick={submitHandler}>
          <Link to="/search">Поиск</Link>
        </button>
      </div>
    </form>
  )
}
