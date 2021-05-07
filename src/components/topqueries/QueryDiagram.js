import React, { useEffect, useRef, useState, useContext } from "react";
import { DiagramContext } from "../../context/diagram/DiagramContext";
import { ExpandHeaderContext } from "../../context/expandHeader/ExpandHeaderContext";
import { LabelContext } from "../../context/label/LabelContext";

const DIAGRAM_COLORS = ["#2231B8", "#902222", "#53238F", "#D9BC25", "#21A1CA"];
const DIAGRAM_RADIUS = 172;
const CIRCLE_CENTER = 300;

export const QueryDiagram = ({ numberOfQuery }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const { periodType } = useContext(ExpandHeaderContext);
  const { showLabel, hideLabel } = useContext(LabelContext);

  const {
    getSectorByCoordinates,
    diagramExpand,
    drawDiagram,
    isExpand,
  } = useContext(DiagramContext);

  useEffect(() => {
    canvasRef.current.width = 600;
    canvasRef.current.height = 600;

    contextRef.current = canvasRef.current.getContext("2d");

    //Inition Diagram
    drawDiagram(contextRef, numberOfQuery);
  }, [periodType]);

  const onClick = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;

    if (isExpand) {
      contextRef.current.clearRect(0, 0, 600, 600);

      drawDiagram(contextRef, numberOfQuery);
      hideLabel();

      return;
    }
    diagramExpand(contextRef, x, y);

    const sectorNumber = getSectorByCoordinates(x, y);
    showLabel(sectorNumber, { x, y }, DIAGRAM_COLORS[sectorNumber]);
  };

  return (
    <div>
      <h1>Query Diagram</h1>
      <canvas ref={canvasRef} onClick={onClick}></canvas>
    </div>
  );
};
