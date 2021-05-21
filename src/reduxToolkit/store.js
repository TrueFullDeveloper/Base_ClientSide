import { configureStore } from "@reduxjs/toolkit";
import labelReducer from "./Slice/labelSlice";
import graphicReducer from "./Slice/graphicSlice";
import expandHeaderReducer from "./Slice/expandHeaderSlice";
import diagramReducer from "./Slice/diagramSlice";
// API Reducers
import authReducer from "./SliceWithAPI/authSlice";
import historyReducer from "./SliceWithAPI/historySlice";
import passwordResetReducer from "./SliceWithAPI/passwordResetSlice";
import profileReducer from "./SliceWithAPI/profileSlice";
import searchReducer from "./SliceWithAPI/searchSlice";
import topQueriesReducer from "./SliceWithAPI/topQueriesSlice";

export default configureStore({
  reducer: {
    label: labelReducer,
    graphic: graphicReducer,
    expandHeader: expandHeaderReducer,
    diagram: diagramReducer,
    // Reducers with API
    auth: authReducer,
    history: historyReducer,
    passwordReset: passwordResetReducer,
    profile: profileReducer,
    search: searchReducer,
    topQueries: topQueriesReducer,
  },
});
