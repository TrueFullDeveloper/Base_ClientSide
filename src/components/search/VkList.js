import React from 'react';

export const VkList = ({ vkItems }) => {
  return (
    <div>
      {vkItems.map(vkItem => (
        <div key={vkItem.id}>
          <strong>{vkItem.id}</strong>
          <small>{vkItem.title}</small>
          <strong>{vkItem.query}</strong>
          <a href='#'>Перейти</a>
        </div>
      ))}
    </div>
  );
};
