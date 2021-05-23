import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({ userToken }) => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
      );

      const payload = [
        {
          timeSpan: "Сегодня - Четверг, 1 октября",
          historyDay: [
            { time: "10:37", queryHistory: "Python", id: 1 },
            { time: "10:37", queryHistory: "Dfdfsd", id: 2 },
            { time: "10:37", queryHistory: "dfdf", id: 3 },
            { time: "10:37", queryHistory: "Vvfdvf", id: 4 },
          ],
        },
        {
          timeSpan: "Вчера - Среда, 30 ноября",
          historyDay: [
            { time: "10:37", queryHistory: "Bgvsdg", id: 5 },
            { time: "10:37", queryHistory: "Python", id: 6 },
            { time: "10:37", queryHistory: "Python", id: 7 },
            { time: "10:37", queryHistory: "Python", id: 8 },
          ],
        },
        {
          timeSpan: "Сегодня - Четверг, 1 октября",
          historyDay: [
            { time: "10:37", queryHistory: "Python", id: 9 },
            { time: "10:37", queryHistory: "Python", id: 10 },
            { time: "10:37", queryHistory: "Python", id: 11 },
            { time: "10:37", queryHistory: "Python", id: 12 },
          ],
        },
      ];

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const deleteHistoryItem = createAsyncThunk(
  "history/deleteHistoryItem",
  async ({ historyItemId }) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${historyItemId}`
      );

      return historyItemId;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    historyList: [
      {
        timeSpan: "Сегодня - Четверг, 1 октября",
        historyDay: [{ time: "10:37", queryHistory: "Python", id: 1 }],
      },
    ],
    loading: false,
  },

  extraReducers: {
    [getHistory.pending]: state => {
      state.loading = true;
    },

    [getHistory.fulfilled]: (state, { payload }) => {
      state.historyList = payload;
      state.loading = false;
    },

    [deleteHistoryItem.pending]: state => {
      state.loading = true;
    },

    [deleteHistoryItem.fulfilled]: (state, { payload: historyItemId }) => {
      state.historyList = state.historyList.map(historyItem => ({
        ...historyItem,
        historyDay: historyItem.historyDay.filter(
          historyDayItem => historyDayItem.id !== historyItemId
        ),
      }));
      state.loading = false;
    },
  },
});

export const selectHistoryLoading = state => state.history.loading;

export const selectHistory = state => state.history.historyList;

export default historySlice.reducer;
