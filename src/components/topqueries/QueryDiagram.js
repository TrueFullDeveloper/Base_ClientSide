import React, { useEffect, useRef } from 'react';

const DIAGRAM_COLORS = ['#2231B8', '#902222', '#53238F', '#D9BC25', '#21A1CA'];
const DIAGRAM_RADIUS = 172;
const CIRCLE_CENTER = 172;

const calcPercent = data => {
  let totalValue = 0;

  let allPercent = [];

  data.map(dataItem => {
    let arrayValue = 0;

    dataItem.map(value => {
      totalValue += value;
      arrayValue += value;
    });

    allPercent.push(arrayValue);
  });

  allPercent = allPercent.map(percent => {
    return Math.round(100 * (percent / totalValue));
  });

  return allPercent;
};

const drawDiagram = (diagramRef, percent, startAngel, color) => {
  diagramRef.current.fillStyle = color;
  diagramRef.current.beginPath();
  diagramRef.current.moveTo(CIRCLE_CENTER, CIRCLE_CENTER);

  const endAngel = startAngel - ((Math.PI / 180) * percent * 360) / 100;

  diagramRef.current.arc(CIRCLE_CENTER, CIRCLE_CENTER, DIAGRAM_RADIUS, startAngel, endAngel, true);
  diagramRef.current.closePath();
  diagramRef.current.fill();
  console.log((startAngel * 180) / Math.PI);
  return endAngel;
};

const initDiagram = (data, diagramRef) => {
  const allPercent = calcPercent(data);

  let startAngel = 0;

  allPercent.map((per, id) => {
    startAngel = drawDiagram(diagramRef, per, startAngel, DIAGRAM_COLORS[id]);
  });
};

const sectorValidation = () => {
  return;
};

const getSectorByCoordinates = (x, y) => {
  console.log(Math.round((Math.atan((CIRCLE_CENTER - y) / (CIRCLE_CENTER - x)) * 180) / Math.PI));
};

export const QueryDiagram = ({ graphicData }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    canvasRef.current.width = 344;
    canvasRef.current.height = 344;

    contextRef.current = canvasRef.current.getContext('2d');

    //Inition
    initDiagram(graphicData, contextRef);
  }, []);

  const onClick = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    getSectorByCoordinates(offsetX, offsetY);
  };

  return (
    <div>
      <h1>Query Diagram</h1>
      <canvas ref={canvasRef} onClick={onClick}></canvas>
    </div>
  );
};
