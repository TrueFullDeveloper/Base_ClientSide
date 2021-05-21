import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async ({ userToken }) => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
      );

      const payload = Object.keys(res.data).map(key => {
        return { ...res.data[key] };
      });

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
      { id: 1, title: "rowadz" },
      { id: 2, title: "rowadz02" },
      { id: 3, title: "rowadz03" },
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
      state.historyList = state.historyList.filter(
        historyItem => historyItem.id !== historyItemId
      );
      state.loading = false;
    },
  },
});

export const selectHistoryLoading = state => state.history.loading;

export const selectHistory = state => state.history.historyList;

export default historySlice.reducer;
