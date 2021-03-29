import React from 'react';

export const TelegramList = ({ telegramItems }) => {
  return (
    <div>
      {telegramItems.map(telegramItem => (
        <div key={telegramItem.id}>
          <strong>{telegramItem.id}</strong>
          <small>{telegramItem.title}</small>
          <a href='#'>Перейти</a>
        </div>
      ))}
    </div>
  );
};
