import React, { useReducer } from "react";
import { SET_COORDINATES } from "../types";
import { GraphicContext } from "./GraphicContext";
import { graphicReducer } from "./graphicReducer";

export const GraphicState = ({ children }) => {
  const initialState = {
    convertCoordinates: [],
  };

  const [state, dispatch] = useReducer(graphicReducer, initialState);

  // Not Export
  const getBoundaryValue = (graphicValues) => {
    let tempArray = [];

    graphicValues.map((graphicArray) => {
      tempArray = tempArray.concat(graphicArray);
    });

    let maxValue = Math.max.apply(null, tempArray);
    let minValue = Math.min.apply(null, tempArray);

    minValue -=
      minValue % Number("1" + "0".repeat(minValue.toString().length - 1));
    maxValue =
      maxValue -
      (maxValue % Number("1" + "0".repeat(maxValue.toString().length - 1))) +
      Number("1" + "0".repeat(maxValue.toString().length - 1));

    return { maxValue, minValue };
  };

  // Not Export
  const drawGrid = (contextRef, yTicksValue, xTicksValue, tickStep) => {
    let i = 0;

    contextRef.current.lineWidth = 2;
    contextRef.current.strokeStyle = "#FAF3F3";
    contextRef.current.beginPath();
    contextRef.current.moveTo(102, 405);

    contextRef.current.lineTo(630, 405); // X Line

    contextRef.current.lineTo(623, 398); // Arrow
    contextRef.current.lineTo(630, 405);
    contextRef.current.lineTo(623, 412);
    contextRef.current.stroke();

    contextRef.current.font = "10px Roboto"; // Text Setting
    contextRef.current.textAlign = "center";
    contextRef.current.fillStyle = "#9F9F9F";

    // Draw Ticks for X Line
    for (let x = 102; x < 630; x += tickStep) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, 407);
      contextRef.current.lineTo(x, 401);
      contextRef.current.stroke();

      contextRef.current.fillText(xTicksValue[i], x, 425);
      i++;
    }

    contextRef.current.strokeStyle = "rgba(242, 242, 242, 0.25)"; // Grid Color
    contextRef.current.textAlign = "end";

    // Draw Ordinate
    i = 4;
    for (let y = 50; y < 351; y += 70) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(102, y);
      contextRef.current.lineTo(630, y);
      contextRef.current.stroke();

      contextRef.current.fillText(yTicksValue[i], 87, y + 3);
      i--;
    }
  };

  const lenearFunction = (x, x1, x2, y1, y2) =>
    Math.round(((x - x1) / (x2 - x1)) * (y2 - y1) + y1);

  const refreshLine = (lineRef, graphicArray) => {
    lineRef.current.clearRect(0, 0, 720, 480); // Clear Canvas

    // Redraw Line
    lineRef.current.lineWidth = 3;

    lineRef.current.beginPath(); // Set origin
    lineRef.current.moveTo(graphicArray[0].x, graphicArray[0].y);

    graphicArray.map((coordinate) => {
      const { x, y } = coordinate;

      lineRef.current.lineTo(x, y);
      lineRef.current.stroke();
    });
  };

  const setGraphic = (graphicData, periodType, contextRef) => {
    const { maxValue, minValue } = getBoundaryValue(graphicData);

    const convertValue = 350 / maxValue;
    const tick = (maxValue - minValue) / 4;
    let temp = minValue;

    // Init Payload Value
    let tickStep;
    let convertCoordinates = [[], [], [], [], []];
    let yTicksValue = [];
    let xTicksValue = [];

    // Set yTicksValue
    for (let i = 0; i < 5; i++) {
      yTicksValue.push(temp);
      temp += tick;
    }

    // Set xTicksValue AND tickStep
    switch (periodType) {
      case "day":
        xTicksValue = [
          "00:00",
          "03:00",
          "06:00",
          "09:00",
          "12:00",
          "15:00",
          "18:00",
          "21:00",
        ];

        tickStep = 66;
        break;

      case "week":
        xTicksValue = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

        tickStep = 76;
        break;

      case "month":
        xTicksValue = ["Нед. 1", "Нед. 2", "Нед. 3", "Нед. 4"];

        tickStep = 132;
        break;

      default:
        break;
    }

    // Set convertCoordinates
    graphicData.map((graphicArray, lineId) => {
      let x = 102;

      graphicArray.map((y) => {
        y = Math.round(350 - convertValue * y + 50);
        convertCoordinates[lineId].push({ x, y });
        x += tickStep;
      });
    });

    // Set payload
    const payload = convertCoordinates;

    dispatch({
      type: SET_COORDINATES,
      payload,
    });

    // Draw Grid
    drawGrid(contextRef, yTicksValue, xTicksValue, tickStep); //Stupid BUT Work
  };

  const drawMark = (lineRef, markValue, coordinate) => {
    // Draw Circle
    lineRef.current.beginPath();
    lineRef.current.fillStyle = "#2D2D2D";
    lineRef.current.arc(coordinate.x, coordinate.y, 9, 0, Math.PI * 2);
    lineRef.current.fill();

    lineRef.current.stroke();

    // Draw Lable
    lineRef.current.fillStyle = "#171717";
    lineRef.current.fillRect(coordinate.x - 20, coordinate.y - 30, 40, 20);

    lineRef.current.font = "10px Roboto"; // Text Setting
    lineRef.current.textAlign = "center";
    lineRef.current.fillStyle = "#9F9F9F";

    lineRef.current.fillText(markValue, coordinate.x, coordinate.y - 15);
  };

  return (
    <GraphicContext.Provider
      value={{
        setGraphic,
        refreshLine,
        drawMark,
        lenearFunction,
        convertCoordinates: state.convertCoordinates,
      }}
    >
      {children}
    </GraphicContext.Provider>
  );
};
