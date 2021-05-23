import React from "react";
import styles from "./HistoryList.module.css";

export const HistoryList = ({ history, onRemove }) => {
  // Delete Empty Object
  history = history.filter(historyItem => historyItem.historyDay.length !== 0);

  return (
    <div style={{ paddingBottom: "100px" }}>
      {history.map((historyItem, id) => (
        <div className={styles.history_block} key={id}>
          <h1>{historyItem.timeSpan}</h1>

          {historyItem.historyDay.map(historyDayItem => (
            <div className={styles.history_item} key={historyDayItem.id}>
              <h3>{historyDayItem.time}</h3>
              <h4 className={styles.history_title} href="#">
                {historyDayItem.queryHistory}
              </h4>
              <button
                type="submit"
                onClick={() => onRemove(historyDayItem.id)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
