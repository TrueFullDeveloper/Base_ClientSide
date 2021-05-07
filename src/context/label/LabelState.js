import React, { useReducer } from "react";
import { labelReducer } from "./labelReducer";
import { LabelContext } from "./LabelContext";

import { SHOW_LABEL, HIDE_LABEL } from "../types";

export const LabelState = ({ children }) => {
  const initialState = {
    visible: false,
    sectorNumber: null,
    coordinates: null,
    color: null,
  };
  const [state, dispatch] = useReducer(labelReducer, initialState);

  const showLabel = (sectorNumber, coordinates, color) => {
    const payload = { sectorNumber, coordinates, color };
    // TODO: Add Logic

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
        sectorNumber: state.sectorNumber,
        coordinates: state.coordinates,
        color: state.color,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};
