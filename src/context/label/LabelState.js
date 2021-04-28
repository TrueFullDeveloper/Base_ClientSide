import React, { useReducer } from "react";
import { labelReducer } from "./labelReducer";
import { LabelContext } from "./LabelContext";

import { SHOW_LABEL, HIDE_LABEL } from "../types";

export const LabelState = ({ children }) => {
  const initialState = {
    visible: false,
    content: null,
    coordinates: null,
    color: null,
  };
  const [state, dispatch] = useReducer(labelReducer, initialState);

  const showLabel = (content, coordinates, color) => {
    const payload = { content, coordinates, color };

    dispatch({
      type: SHOW_LABEL,
      payload,
    });
  };

  const hideLabel = () => dispatch({ type: HIDE_LABEL });

  return (
    <LabelContext.Provider
      value={{
        showLabel,
        hideLabel,
        content: state.content,
        coordinates: state.coordinates,
        color: state.color,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};
