import React from 'react'

export const YoutubeList = ({ youtubeItems }) => {
  return (
    <div>
      {youtubeItems.map((youtubeItem) => (
        <div key={youtubeItem.id}>
          <strong>{youtubeItem.id}</strong>
          <small>{youtubeItem.title}</small>
          <a href="#">Перейти</a>
        </div>
      ))}
    </div>
  )
}
