import React from 'react'

export const QueryList = ({ queries }) => {
  return (
    <ul>
      {queries.map(queriesItem => (
        <li key={queriesItem.id}>
          <div>
            <strong>{queriesItem.id}</strong>
            <small>{queriesItem.title}</small>
          </div>
        </li>
      ))}
    </ul>
  )
}
