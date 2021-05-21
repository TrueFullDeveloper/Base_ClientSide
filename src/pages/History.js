import React, { Fragment, useEffect, useState } from "react";
import { HistoryList } from "../components/history/HistoryList";
import { HistorySearch } from "../components/history/HistorySearch";
import { Loader } from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  getHistory,
  deleteHistoryItem,
  selectHistoryLoading,
  selectHistory,
} from "../reduxToolkit/SliceWithAPI/historySlice";

export const History = () => {
  const [historyState, setHistory] = useState(false); // Издалека похоже на костыль(

  const loading = useSelector(selectHistoryLoading);
  const history = useSelector(selectHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHistory("USER_TOKEN"));
    // eslint-disable-next-line
  }, [dispatch]);

  const filterHistory = value => {
    setHistory(
      history.filter(historyItem => historyItem.title.startsWith(value))
    );
  };

  const onRemove = historyItemId => {
    setHistory(history.filter(historyItem => historyItem.id !== historyItemId));
    dispatch(deleteHistoryItem({ historyItemId }));
  };

  return (
    <Fragment>
      <div>History</div>
      <HistorySearch filterHistory={filterHistory} />
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <HistoryList history={historyState || history} onRemove={onRemove} />
      )}
    </Fragment>
  );
};
