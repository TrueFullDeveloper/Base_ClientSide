import React, { useContext } from "react";
import { ExpandHeaderContext } from "../../context/expandHeader/ExpandHeaderContext";

export const ExpandHeader = () => {
  const { setPeriodType } = useContext(ExpandHeaderContext);

  return (
    <nav>
      <ul>
        <li>
          <button type="button" onClick={() => setPeriodType("day")}>
            Поисковые тренды за сутки
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setPeriodType("week")}>
            Поисковые тренды за сутки
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setPeriodType("month")}>
            Поисковые тренды за сутки
          </button>
        </li>
      </ul>
    </nav>
  );
};
