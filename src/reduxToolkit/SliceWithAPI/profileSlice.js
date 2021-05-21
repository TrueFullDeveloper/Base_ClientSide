import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async ({ userToken }) => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
      );

      const userData = {
        userName: "Cezar",
        email: "wannakillms@gmail.com",
        telegram: "@DieYouWatchCo",
      };

      const payload = { ...userData };

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const profileUpdate = createAsyncThunk(
  "profile/profileUpdate",
  async userData => {
    try {
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );

      const payload = { ...userData };

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: { userName: "", email: "", telegram: "" },
    loading: false,
  },

  extraReducers: {
    [fetchProfile.pending]: state => {
      state.loading = true;
    },

    [fetchProfile.fulfilled]: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
    },

    [profileUpdate.pending]: state => {
      state.loading = true;
    },

    [profileUpdate.fulfilled]: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
    },
  },
});

export const selectProfileLoading = state => state.profile.loading;

export const selectProfile = state => state.profile.profileData;

export default profileSlice.reducer;
