import React, { useState } from "react";
import styles from "./HistorySearch.module.css";
import historyIcon from "../../static/images/history/history_icon.svg";

export const HistorySearch = ({ filterHistory }) => {
  const [value, setValue] = useState("");

  const onClick = event => {
    event.preventDefault();
    filterHistory(value);
  };

  return (
    <div class={styles.history_search}>
      <h1>
        <img src={historyIcon} alt="nothing" />
        История
      </h1>
      <input
        type="text"
        placeholder="Введите название"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={onClick} type="submit">
        Поиск
      </button>
    </div>
  );
};
