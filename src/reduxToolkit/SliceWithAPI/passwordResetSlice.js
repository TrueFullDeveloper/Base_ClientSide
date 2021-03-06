import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendEmail = createAsyncThunk(
  "passwordReset/sendEmail",
  async userEmail => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userEmail)
      );
      // Далее создаю код, который сервер должен возвратить
      const payload = "678666";

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "passwordReset/changePassword",
  async ({ newPassword, newPasswodRep }) => {
    try {
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(newPassword, newPasswodRep)
      );
    } catch (err) {
      console.log(err.message);
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    cod: null,
    loading: false,
  },

  extraReducers: {
    [sendEmail.pending]: state => {
      state.loading = true;
    },

    [sendEmail.fulfilled]: (state, { payload: cod }) => {
      state.cod = cod;
      state.loading = false;
    },
  },
});

export const selectResetCod = state => state.passwordReset.cod;

export const selectResetLoading = state => state.passwordReset.loading;

export default passwordResetSlice.reducer;
