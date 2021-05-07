import React from "react";

export const QueryList = ({ queryContent }) => {
  return (
    <ul>
      {queryContent.map((queriesItem) => (
        <li key={queriesItem.id}>
          <div>
            <strong>{queriesItem.title}</strong>
            <small>{queriesItem.text}</small>
          </div>
        </li>
      ))}
    </ul>
  );
};
