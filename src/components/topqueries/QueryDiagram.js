import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getSectorByCoordinates,
  diagramExpand,
  drawDiagram,
} from "../../utils/diagramUtil";
import { selectPeriodType } from "../../reduxToolkit/Slice/expandHeaderSlice";
import {
  selectDiagramAngles,
  setAngles,
} from "../../reduxToolkit/Slice/diagramSlice";
import { hideLabel, showLabel } from "../../reduxToolkit/Slice/labelSlice";

// const DIAGRAM_COLORS = ["#2231B8", "#902222", "#53238F", "#D9BC25", "#21A1CA"];
// const DIAGRAM_RADIUS = 172;
// const CIRCLE_CENTER = 300;

export const QueryDiagram = ({ topQueriesData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const periodType = useSelector(selectPeriodType);
  const dispatch = useDispatch();

  const [numberOfQuery, setNumberOfQuery] = useState([]);
  const [isExpand, setExpandStatus] = useState(false);

  const diagramAngles = useSelector(selectDiagramAngles);

  useEffect(() => {
    canvasRef.current.width = 600;
    canvasRef.current.height = 600;

    contextRef.current = canvasRef.current.getContext("2d");

    //dispatch(setAngles(drawDiagram(contextRef, numberOfQuery))); //TODO add if(isExpand)

    switch (periodType) {
      case "day":
        setNumberOfQuery(topQueriesData.day.numberOfQuery);
        break;

      case "week":
        setNumberOfQuery(topQueriesData.week.numberOfQuery);
        break;

      case "month":
        setNumberOfQuery(topQueriesData.month.numberOfQuery);
        break;

      default:
        break;
    }
  }, [periodType]);

  useEffect(() => {
    dispatch(setAngles(drawDiagram(contextRef, numberOfQuery)));

    console.log(diagramAngles); // DEBUG
  }, [numberOfQuery]);

  const onClick = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;

    if (isExpand) {
      contextRef.current.clearRect(0, 0, 600, 600);

      drawDiagram(contextRef, numberOfQuery);
      setExpandStatus(false);
      dispatch(hideLabel());

      return;
    }
    diagramExpand(contextRef, x, y, diagramAngles);
    setExpandStatus(true);

    //Show Label
    const sectorNumber = getSectorByCoordinates(x, y, diagramAngles);
    dispatch(showLabel(sectorNumber, { coordinates: { x, y } }));
  };

  return (
    <div>
      <h1>Query Diagram</h1>
      <canvas ref={canvasRef} onClick={onClick}></canvas>
    </div>
  );
};
