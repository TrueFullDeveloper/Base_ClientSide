import React from 'react'

export const BookList = ({ bookItems }) => {
  return (
    <div>
      {bookItems.map((bookItem) => (
        <div key={bookItem.id}>
          <strong>{bookItem.id}</strong>
          <small>{bookItem.title}</small>
          <a href="#">Перейти</a>
        </div>
      ))}
    </div>
  )
}
