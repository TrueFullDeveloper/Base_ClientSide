import React, { useReducer } from "react";
import axios from "axios";
import { PostgresContext } from "./PostgresContext";
import { postgresReducer } from "./postgresReducer";
import {
  SHOW_LOADER,
  FETCH_HISTORY,
  REMOVE_HISTORYITEM,
  SEARCH_QUERY,
  FETCH_PROFILE,
  HIDE_LOADER,
  SET_COD,
  FETCH_TOP_QUERIES,
} from "../types";

export const PostgresState = ({ children }) => {
  const initialState = {
    history: [],
    response: [],
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
    profileData: { userName: "", email: "", telegram: "" },
    cod: "",
    loading: false,
  };
  const [state, dispatch] = useReducer(postgresReducer, initialState);

  const showLoader = () => dispatch({ type: SHOW_LOADER });

  const fetchHistory = async () => {
    showLoader();
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
    );

    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key] };
    });
    dispatch({ type: FETCH_HISTORY, payload });
  };

  const fetchResponse = async (query = null) => {
    showLoader();
    // Пока что query некуда всавлять т.к. запросы идут
    // на фековое API
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
    );

    const payload = Object.keys(res.data).map((key) => {
      return { ...res.data[key], query: query };
    });

    dispatch({ type: SEARCH_QUERY, payload });
  };

  const removeHistoryItem = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    dispatch({
      type: REMOVE_HISTORYITEM,
      payload: id,
    });
  };

  const fetchProfile = async (userId) => {
    try {
      showLoader();

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${userId}`
      );
      // Далее создаю объект, который сервер должен возвратить
      const userData = {
        userName: "Cezar",
        email: "wannakillms@gmail.com",
        telegram: "@DieYouWatchCo",
      };
      const payload = { ...userData };

      dispatch({ type: FETCH_PROFILE, payload });
    } catch (e) {
      console.log(e.message);
    }
  };

  const profileChange = async (userData) => {
    try {
      showLoader();

      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );
      const payload = { ...userData };

      dispatch({ type: FETCH_PROFILE, payload });
    } catch (e) {
      console.log(e.message);
    }
  };

  const sendEmail = async (userEmail) => {
    try {
      showLoader();

      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userEmail)
      );
      // Далее создаю код, который сервер должен возвратить
      const payload = "678666";

      dispatch({ type: SET_COD, payload });
    } catch (e) {
      console.log(e.message);
    }
  };

  const passwordChange = async (newPassword) => {
    try {
      showLoader();

      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(newPassword)
      );

      dispatch({ type: HIDE_LOADER });
    } catch (e) {
      console.log(e.message);
    }
  };

  const fetchQueries = async () => {
    try {
      showLoader();

      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5"
      );

      // let payload = Object.keys(res.data).map((key) => {
      //   return { ...res.data[key] };
      // });

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
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
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
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
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
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
            { title: "String", text: "String" },
          ],
        },
      };

      //payload = { queries: [...payload], graphicData };

      dispatch({ type: FETCH_TOP_QUERIES, payload });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <PostgresContext.Provider
      value={{
        showLoader,
        removeHistoryItem,
        fetchHistory,
        fetchResponse,
        fetchProfile,
        profileChange,
        passwordChange,
        sendEmail,
        fetchQueries,
        loading: state.loading,
        history: state.history,
        response: state.response,
        profileData: state.profileData,
        cod: state.cod,
        topQueriesData: state.topQueriesData,
      }}
    >
      {children}
    </PostgresContext.Provider>
  );
};
