import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchResponse = createAsyncThunk(
  "search/fetchResponse",
  async userQuery => {
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

const searchSlice = createSlice({
  name: "search",
  initialState: {
    responseList: [],
    loading: false,
  },

  extraReducers: {
    [fetchResponse.pending]: state => {
      state.loading = true;
    },

    [fetchResponse.fulfilled]: (state, { payload }) => {
      state.responseList = payload;
      state.loading = false;
    },
  },
});

export const selectSearchLoading = state => state.search.loading;

export const selectResponseList = state => state.search.responseList;

export default searchSlice.reducer;
