import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQueries = createAsyncThunk(
  "topQueries/fetchQueries",
  async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
      );

      // Данные которые вернет сервер
      const payload = {
        day: {
          numberOfQuery: [
            [1200, 2500, 1450, 3000, 2500, 4000, 2000, 4500],
            [4500, 2000, 4000, 2500, 3000, 1450, 2500, 1200],
            [1000, 3500, 2450, 3500, 4500, 1000, 2222, 1600],
            [3200, 4500, 3450, 1000, 2000, 2000, 1300, 4650],
            [2200, 1500, 3000, 4000, 3500, 1000, 3000, 3500],
          ],

          queryContent: [
            { title: "String day ", text: "String" },
            { title: "String day ", text: "String" },
            { title: "String day ", text: "String" },
            { title: "String day ", text: "String" },
            { title: "String day ", text: "String" },
          ],
        },

        week: {
          numberOfQuery: [
            [1200, 2500, 1450, 3000, 2500, 4000, 2000],
            [4500, 2000, 4000, 2500, 3000, 1450, 2500],
            [1000, 3500, 2450, 3500, 4500, 1000, 2222],
            [3200, 4500, 3450, 1000, 2000, 2000, 1300],
            [2200, 1500, 3000, 4000, 3500, 1000, 3000],
          ],

          queryContent: [
            { title: "String week ", text: "String" },
            { title: "String week ", text: "String" },
            { title: "String week ", text: "String" },
            { title: "String week ", text: "String" },
            { title: "String week ", text: "String" },
          ],
        },

        month: {
          numberOfQuery: [
            [1200, 2500, 1450, 3000],
            [4500, 2000, 4000, 2500],
            [1000, 3500, 2450, 3500],
            [3200, 4500, 3450, 1000],
            [2200, 1500, 3000, 4000],
          ],

          queryContent: [
            { title: "String month ", text: "String" },
            { title: "String month ", text: "String" },
            { title: "String month ", text: "String" },
            { title: "String month ", text: "String" },
            { title: "String month ", text: "String" },
          ],
        },
      };

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const topQueriesSlice = createSlice({
  name: "topQueries",
  initialState: {
    topQueriesData: {
      day: {
        numberOfQuery: [[0], [0], [0], [0], [0]],
        queryContent: [{ title: "String", text: "String" }],
      },

      week: {
        numberOfQuery: [[0], [0], [0], [0], [0]],
        queryContent: [{ title: "String", text: "String" }],
      },

      month: {
        numberOfQuery: [[0], [0], [0], [0], [0]],
        queryContent: [{ title: "String", text: "String" }],
      },
    },
    loading: false,
  },

  extraReducers: {
    [fetchQueries.pending]: state => {
      state.loading = true;
    },

    [fetchQueries.fulfilled]: (state, { payload }) => {
      state.topQueriesData = payload;
      state.loading = false;
    },
  },
});

export const selectQueriesData = state => state.topQueries.topQueriesData;

export const selectQueriesLoading = state => state.topQueries.loading;

export default topQueriesSlice.reducer;
