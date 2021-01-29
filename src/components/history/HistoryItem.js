import React from 'react'

export const HistoryItem = ({ history, onRemove }) => {
  return (
    <ul>
      {history.map((historyItem) => (
        <li key={historyItem.id}>
          <div>
            <strong>{historyItem.id}</strong>
            <small>{historyItem.title}</small>
          </div>

          <button type="button" onClick={() => onRemove(historyItem.id)}>
            &times;
          </button>
        </li>
      ))}
    </ul>
  )
}
