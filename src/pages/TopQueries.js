import React, { Fragment, useContext, useEffect } from 'react'
import { QueryList } from '../components/topqueries/QueryList'
import { Loader } from '../components/loader/Loader'
import { PostgresContext } from '../context/postgresql/PostgresContext'

export const TopQueries = () => {
  const { fetchQueries, queries, loading } = useContext(PostgresContext)

  useEffect(() => {
    fetchQueries()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <div>Top Queries</div>

      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <QueryList queries={queries} />
      )}
    </Fragment>
  )
}
