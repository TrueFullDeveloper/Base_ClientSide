import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectPeriodType } from "../../reduxToolkit/Slice/expandHeaderSlice";

export const QueryList = ({ topQueriesData }) => {
  const periodType = useSelector(selectPeriodType);

  const [queryContent, setQueryContent] = useState([]);

  useEffect(() => {
    switch (periodType) {
      case "day":
        setQueryContent(topQueriesData.day.queryContent);
        break;

      case "week":
        setQueryContent(topQueriesData.week.queryContent);
        break;

      case "month":
        setQueryContent(topQueriesData.month.queryContent);
        break;

      default:
        break;
    }
  }, [periodType]);

  return (
    <ul>
      {queryContent.map(queriesItem => (
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
