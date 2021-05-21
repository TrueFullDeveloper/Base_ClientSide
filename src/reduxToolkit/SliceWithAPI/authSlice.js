import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storageName = "UserData"; // TODO: Transfer it to Constants.js

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async userData => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );

      const payload = {
        token: "ddddddddddddsdssd",
        password: userData.password,
      };

      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: payload.token, // TODO: Here Should Be res.jwtToken
          password: userData.password,
        })
      );

      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async userData => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );

      const payload = {
        token: "ddddddddddddsdssd",
        password: userData.password,
      };

      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: payload.token, // TODO: Here Should Be res.jwtToken
          password: userData.password,
        })
      );

      return payload;
    } catch (e) {
      console.log(e.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    password: null,
    isAuthenticated: false,
    loading: false,
  },

  reducers: {
    logout(state) {
      state.token = null;
      state.password = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    login(state, { payload }) {
      state.token = payload.token;
      state.password = payload.password;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [fetchLogin.pending]: state => {
      state.loading = true;
    },

    [fetchLogin.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.password = payload.password;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [fetchSignup.pending]: state => {
      state.loading = true;
    },

    [fetchSignup.fulfilled]: (state, { payload }) => {
      state.token = payload.token;
      state.password = payload.password;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

export const selectToken = state => state.auth.token;

export const selectPassword = state => state.auth.password;

export const selectAuthenticated = state => state.auth.isAuthenticated;

export const selectAuthLoading = state => state.auth.loading;

export const userLogout = () => dispatch => {
  localStorage.removeItem(storageName);
  dispatch(logout());
};

export const userLogin = () => dispatch => {
  const userData = JSON.parse(localStorage.getItem(storageName));

  if (userData && userData.token) {
    dispatch(login(userData.token));
  }
};

export default authSlice.reducer;
