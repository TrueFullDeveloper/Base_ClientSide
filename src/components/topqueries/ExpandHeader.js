import React from "react";
import { useDispatch } from "react-redux";
import { setPeriodType } from "../../reduxToolkit/Slice/expandHeaderSlice";

export const ExpandHeader = () => {
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <button type="button" onClick={() => dispatch(setPeriodType("day"))}>
            Поисковые тренды за сутки
          </button>
        </li>
        <li>
          <button type="button" onClick={() => dispatch(setPeriodType("week"))}>
            Поисковые тренды за неделю
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => dispatch(setPeriodType("month"))}
          >
            Поисковые тренды за месяц
          </button>
        </li>
      </ul>
    </nav>
  );
};
