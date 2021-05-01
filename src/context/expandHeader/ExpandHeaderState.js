import React, { useReducer } from "react";
import { expandHeaderReducer } from "./expandHeaderReducer";
import { ExpandHeaderContext } from "./ExpandHeaderContext";

import { SET_TYPE_PERIOD } from "../types";

export const ExpandHeaderState = ({ children }) => {
  const initialState = {
    periodType: "day",
  };

  const [state, dispatch] = useReducer(expandHeaderReducer, initialState);

  const setPeriodType = (payload) => {
    dispatch({
      type: SET_TYPE_PERIOD,
      payload,
    });
  };

  return (
    <ExpandHeaderContext.Provider
      value={{
        setPeriodType,
        periodType: state.periodType,
      }}
    >
      {children}
    </ExpandHeaderContext.Provider>
  );
};
