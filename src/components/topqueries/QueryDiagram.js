import React, { useEffect, useRef, useState, useContext } from "react";
import { LabelContext } from "../../context/label/LabelContext";

const DIAGRAM_COLORS = ["#2231B8", "#902222", "#53238F", "#D9BC25", "#21A1CA"];
const DIAGRAM_RADIUS = 172;
const CIRCLE_CENTER = 300;

const getAngles = (data) => {
  let totalValue = 0;
  let startAngle = 0;

  let allPercent = [];
  let anglesArray = [];

  data.map((dataItem) => {
    let arrayValue = 0;

    dataItem.map((value) => {
      totalValue += value;
      arrayValue += value;
    });

    allPercent.push(arrayValue);
  });

  allPercent = allPercent.map((percent) => {
    return Math.round(100 * (percent / totalValue));
  });

  allPercent.map((percent) => {
    anglesArray.push({
      start: startAngle,
      end: startAngle + ((Math.PI / 180) * percent * 360) / 100,
    });

    startAngle = startAngle + ((Math.PI / 180) * percent * 360) / 100;
  });

  return anglesArray; // In Radians
};

const drawDiagram = (diagramRef, colorsArray, queryData) => {
  let anglesArray = getAngles(queryData);

  anglesArray.map((sector, index) => {
    diagramRef.current.fillStyle = colorsArray[index];

    diagramRef.current.beginPath();
    diagramRef.current.moveTo(CIRCLE_CENTER, CIRCLE_CENTER);

    diagramRef.current.arc(
      CIRCLE_CENTER,
      CIRCLE_CENTER,
      DIAGRAM_RADIUS,
      sector.start,
      sector.end,
      false
    );

    diagramRef.current.fill();
  });
  diagramRef.current.closePath();

  return anglesArray;
};

const diagramAnimation = (diagramRef, colorsArray, anglesArray, x, y) => {
  // Circle Validation
  if (
    Math.pow(x - CIRCLE_CENTER, 2) + Math.pow(y - CIRCLE_CENTER, 2) >
    Math.pow(DIAGRAM_RADIUS, 2)
  ) {
    return;
  }

  diagramRef.current.clearRect(0, 0, 600, 600);

  const sectorNumber = getSectorByCoordinates(x, y, anglesArray);

  const CORRECT_ANGLE = 6 * (Math.PI / 180);

  // Arcs of a Circle

  anglesArray.map((sector, index) => {
    diagramRef.current.fillStyle = colorsArray[index];

    diagramRef.current.beginPath();

    diagramRef.current.arc(
      Math.cos(sector.start + (sector.end - sector.start) / 2) * 23.5 +
        CIRCLE_CENTER,
      Math.sin(sector.start + (sector.end - sector.start) / 2) * 23.5 +
        CIRCLE_CENTER,
      DIAGRAM_RADIUS - 10,
      sector.start,
      sector.end,
      false
    );

    diagramRef.current.fill();
  });
  diagramRef.current.closePath();

  // Lines
  diagramRef.current.lineWidth = 20.5;

  anglesArray.map((sector, index) => {
    diagramRef.current.fillStyle = colorsArray[index];
    diagramRef.current.strokeStyle = colorsArray[index];
    diagramRef.current.lineCap = "round";
    diagramRef.current.lineJoin = "round";

    diagramRef.current.beginPath();

    diagramRef.current.moveTo(
      Math.cos(sector.start + (sector.end - sector.start) / 2) * 30 +
        CIRCLE_CENTER,
      Math.sin(sector.start + (sector.end - sector.start) / 2) * 30 +
        CIRCLE_CENTER
    );

    diagramRef.current.lineTo(
      Math.cos(sector.start + CORRECT_ANGLE) * DIAGRAM_RADIUS + CIRCLE_CENTER,
      Math.sin(sector.start + CORRECT_ANGLE) * DIAGRAM_RADIUS + CIRCLE_CENTER
    );

    diagramRef.current.lineTo(
      Math.cos(sector.end - CORRECT_ANGLE) * DIAGRAM_RADIUS + CIRCLE_CENTER,
      Math.sin(sector.end - CORRECT_ANGLE) * DIAGRAM_RADIUS + CIRCLE_CENTER
    );

    diagramRef.current.lineTo(
      Math.cos(sector.start + (sector.end - sector.start) / 2) * 30 +
        CIRCLE_CENTER,
      Math.sin(sector.start + (sector.end - sector.start) / 2) * 30 +
        CIRCLE_CENTER
    );

    diagramRef.current.stroke();
    diagramRef.current.closePath();
    diagramRef.current.fill();
  });

  drawLineLable(diagramRef, x, y);
};

const getSectorByCoordinates = (x, y, sectorAngles) => {
  let clickAngle;
  let sectorNumber = 0;

  let degreesArray = [];

  sectorAngles.map((sector) => {
    degreesArray.push({
      start: (sector.start * 180) / Math.PI,
      end: (sector.end * 180) / Math.PI,
    });
  });

  //Quarter Number Circle Validation
  if (x > CIRCLE_CENTER && y < CIRCLE_CENTER) {
    clickAngle = Math.round(
      (Math.atan((CIRCLE_CENTER - y) / (CIRCLE_CENTER - x)) * 180) / Math.PI
    );
  }

  if (x > CIRCLE_CENTER && y > CIRCLE_CENTER) {
    clickAngle = Math.round(
      (Math.atan((CIRCLE_CENTER - y) / (CIRCLE_CENTER - x)) * 180) / Math.PI -
        360
    );
  }

  if (x < CIRCLE_CENTER && y < CIRCLE_CENTER) {
    clickAngle = Math.round(
      (Math.atan((CIRCLE_CENTER - y) / (CIRCLE_CENTER - x)) * 180) / Math.PI -
        180
    );
  }

  if (x < CIRCLE_CENTER && y > CIRCLE_CENTER) {
    clickAngle = Math.round(
      (Math.atan((CIRCLE_CENTER - y) / (CIRCLE_CENTER - x)) * 180) / Math.PI -
        180
    );
  }

  // Get Sector
  degreesArray.map((sector, index) => {
    if (clickAngle < sector.start && clickAngle > sector.end) {
      sectorNumber = index;
    }
  });

  return sectorNumber;
};

const drawLineLable = (diagramRef, x, y) => {
  diagramRef.current.strokeStyle = "#B9B9B9";

  diagramRef.current.lineWidth = 4;

  diagramRef.current.beginPath();

  diagramRef.current.arc(x, y, 10, 0, 2 * Math.PI, false);
  diagramRef.current.stroke();

  diagramRef.current.beginPath();
  diagramRef.current.moveTo(
    -Math.cos(Math.sqrt(2) / 2) * 10 + x,
    -Math.sin(Math.sqrt(2) / 2) * 10 + y
  );

  diagramRef.current.lineTo(
    -Math.cos(Math.sqrt(2) / 2) * 166 + x,
    -Math.sin(Math.sqrt(2) / 2) * 166 + y
  );

  diagramRef.current.lineTo(
    -Math.cos(Math.sqrt(2) / 2) * 166 + x + 185,
    -Math.sin(Math.sqrt(2) / 2) * 166 + y
  );

  diagramRef.current.stroke();
};

export const QueryDiagram = ({ graphicData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [isAnimated, setAnimated] = useState(false);
  const [sectorAnglesArray, setSectorAnglesArray] = useState([]);

  const { showLabel, hideLabel } = useContext(LabelContext);

  useEffect(() => {
    canvasRef.current.width = 600;
    canvasRef.current.height = 600;

    contextRef.current = canvasRef.current.getContext("2d");

    //Inition Diagram
    setSectorAnglesArray(drawDiagram(contextRef, DIAGRAM_COLORS, graphicData));
  }, []);

  const onClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isAnimated) {
      contextRef.current.clearRect(0, 0, 600, 600);
      drawDiagram(contextRef, DIAGRAM_COLORS, graphicData);
      hideLabel();
      setAnimated(false);
      return;
    }

    diagramAnimation(
      contextRef,
      DIAGRAM_COLORS,
      sectorAnglesArray,
      offsetX,
      offsetY
    );

    showLabel();
    setAnimated(true);
  };

  return (
    <div>
      <h1>Query Diagram</h1>
      <canvas ref={canvasRef} onClick={onClick}></canvas>
    </div>
  );
};
