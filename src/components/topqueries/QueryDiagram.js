import React, { useEffect, useRef } from "react";

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
      start: startAngle, // Degrees
      end: startAngle + ((Math.PI / 180) * percent * 360) / 100,
    });

    startAngle = startAngle + ((Math.PI / 180) * percent * 360) / 100;
  });

  return anglesArray; // In Radians
};

const drawDiagram = (diagramRef, colorsArray, anglesArray) => {
  // Без moveTo() рисует то, что мне нужно
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
};

const initDiagram = (data, diagramRef) => {
  let anglesArray = getAngles(data);

  drawDiagram(diagramRef, DIAGRAM_COLORS, anglesArray);

  return anglesArray;
};

const diagramAnimation = (diagramRef, colorsArray, anglesArray) => {
  diagramRef.current.clearRect(0, 0, 600, 600);

  const CORRECT_ANGLE = 6 * (Math.PI / 180);

  // Arcs of a Circle

  anglesArray.map((sector, index) => {
    diagramRef.current.fillStyle = colorsArray[index];

    diagramRef.current.beginPath();
    //diagramRef.current.moveTo(CIRCLE_CENTER, CIRCLE_CENTER);

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
      Math.cos(sector.start + CORRECT_ANGLE) * (DIAGRAM_RADIUS + 0) +
        CIRCLE_CENTER,
      Math.sin(sector.start + CORRECT_ANGLE) * (DIAGRAM_RADIUS + 0) +
        CIRCLE_CENTER
    );

    diagramRef.current.lineTo(
      Math.cos(sector.end - CORRECT_ANGLE) * (DIAGRAM_RADIUS + 0) +
        CIRCLE_CENTER,
      Math.sin(sector.end - CORRECT_ANGLE) * (DIAGRAM_RADIUS + 0) +
        CIRCLE_CENTER
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
  //diagramRef.current.closePath();
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

export const QueryDiagram = ({ graphicData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  let sectorAnglesArray = [];

  useEffect(() => {
    canvasRef.current.width = 600;
    canvasRef.current.height = 600;

    contextRef.current = canvasRef.current.getContext("2d");

    //Inition
    sectorAnglesArray = initDiagram(graphicData, contextRef);
    console.log(sectorAnglesArray);
  }, []);

  const onClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    getSectorByCoordinates(offsetX, offsetY, sectorAnglesArray);

    diagramAnimation(contextRef, DIAGRAM_COLORS, sectorAnglesArray);
  };

  return (
    <div>
      <h1>Query Diagram</h1>
      <canvas ref={canvasRef} onClick={onClick}></canvas>
    </div>
  );
};
