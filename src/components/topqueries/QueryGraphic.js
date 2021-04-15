import React, { useEffect, useRef, useState } from 'react';
// C R I N G E   T R O L L I N G   BEGIN
const style = {
  width: '720px',
  height: '480px',
  background: '#2D2D2D',
  borderRadius: '10px',
  marginLeft: '40px',
  marginBottom: '80px',
  // position: 'absolute',
  // top: '305px',
  // left: '40px',
};
const styleTwo = {
  width: '720px',
  height: '480px',
  position: 'absolute',
  top: '305px',
  left: '40px',
};

const lenearFunction = (x, x1, x2, y1, y2) => Math.round(((x - x1) / (x2 - x1)) * (y2 - y1) + y1);

const getBoundaryValue = graphicValues => {
  let tempArray = [];

  graphicValues.map(graphicArray => {
    tempArray = tempArray.concat(graphicArray);
  });

  let maxValue = Math.max.apply(null, tempArray);
  let minValue = Math.min.apply(null, tempArray);

  minValue -= minValue % Number('1' + '0'.repeat(minValue.toString().length - 1));
  maxValue =
    maxValue -
    (maxValue % Number('1' + '0'.repeat(maxValue.toString().length - 1))) +
    Number('1' + '0'.repeat(maxValue.toString().length - 1));

  return { maxValue, minValue };
};

const refreshLine = (lineRef, graphicArray) => {
  lineRef.current.clearRect(0, 0, 720, 480); // Clear Canvas

  // Redraw Line
  lineRef.current.lineWidth = 3;

  lineRef.current.beginPath(); // Set origin
  lineRef.current.moveTo(graphicArray[0].x, graphicArray[0].y);

  graphicArray.map(coordinate => {
    const { x, y } = coordinate;

    lineRef.current.lineTo(x, y);
    lineRef.current.stroke();
  });
};

const drawMark = (lineRef, markValue, coordinate) => {
  // Draw Circle
  lineRef.current.beginPath();
  lineRef.current.fillStyle = '#2D2D2D';
  lineRef.current.arc(coordinate.x, coordinate.y, 9, 0, Math.PI * 2);
  lineRef.current.fill();

  lineRef.current.stroke();
  // Draw Lable
  lineRef.current.fillStyle = '#171717';
  lineRef.current.fillRect(coordinate.x - 20, coordinate.y - 30, 40, 20);

  lineRef.current.font = '10px Roboto'; // Text Setting
  lineRef.current.textAlign = 'center';
  lineRef.current.fillStyle = '#9F9F9F';

  lineRef.current.fillText(markValue, coordinate.x, coordinate.y - 15);
};

const drawGrid = (contextRef, yTiksValue, xTiksValue, tickStep = 66) => {
  contextRef.current.lineWidth = 2;
  contextRef.current.strokeStyle = '#FAF3F3';
  contextRef.current.beginPath();
  contextRef.current.moveTo(102, 405);

  contextRef.current.lineTo(630, 405); // X Line

  contextRef.current.lineTo(623, 398); // Arrow
  contextRef.current.lineTo(630, 405);
  contextRef.current.lineTo(623, 412);
  contextRef.current.stroke();

  contextRef.current.font = '10px Roboto'; // Text Setting
  contextRef.current.textAlign = 'center';
  contextRef.current.fillStyle = '#9F9F9F';

  let i = 0; // Draw Ticks
  for (let x = 102; x < 630; x += tickStep) {
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, 407);
    contextRef.current.lineTo(x, 401);
    contextRef.current.stroke();

    contextRef.current.fillText(xTiksValue[i], x, 425);
    i++;
  }

  contextRef.current.strokeStyle = 'rgba(242, 242, 242, 0.25)'; // Grid Color
  contextRef.current.textAlign = 'end';

  i = 4; // Grid Draw Grid
  for (let y = 50; y < 351; y += 70) {
    contextRef.current.beginPath();
    contextRef.current.moveTo(102, y);
    contextRef.current.lineTo(630, y);
    contextRef.current.stroke();

    contextRef.current.fillText(yTiksValue[i], 87, y + 3);
    i--;
  }
};

const initGraphciData = (graphicData, typeQuery = 'day') => {
  const { maxValue, minValue } = getBoundaryValue(graphicData);

  let yTiksValue = [];

  let tick = (maxValue - minValue) / 4;
  let temp = minValue;
  for (let i = 0; i < 5; i++) {
    yTiksValue.push(temp);
    temp += tick;
  }
  let xTiksValue = [];
  switch (typeQuery) {
    case 'day':
      xTiksValue = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
      break;

    default:
      break;
  }

  return { yTiksValue, xTiksValue };
};

export const QueryGraphic = ({ graphicData }) => {
  let convertCoordinates = [[], [], [], [], []];

  let x = 102;
  const { maxValue } = getBoundaryValue(graphicData);
  const convertValue = 350 / maxValue;

  let isHold = false;
  let holdX, holdY;
  let holdLineNum;

  graphicData.map((graphicArray, lineId) => {
    graphicArray.map(y => {
      y = Math.round(350 - convertValue * y + 50);
      convertCoordinates[lineId].push({ x, y });
      x += 66;
    });
    x = 102;
  });

  let canvasStorage = [];
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });

  const [isDrawing, setDrawing] = useState(true); // Flags for listener
  const [lineIsDrawn, setLineIsDrawn] = useState([false, false, false, false, false]);
  const [timerIdStore, setTimerIdStore] = useState(Array(5));

  useEffect(() => {
    canvasStorage.map(canvItem => {
      canvItem.canvasRef.current.width = 720;
      canvItem.canvasRef.current.height = 480;

      canvItem.contextRef.current = canvItem.canvasRef.current.getContext('2d');
    });

    const { yTiksValue, xTiksValue } = initGraphciData(graphicData);

    drawGrid(canvasStorage[5].contextRef, yTiksValue, xTiksValue, 66); // Set Grid
  }, []);

  const listener = ({ nativeEvent }) => {
    //Listeners
    if (isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    convertCoordinates.map((coordinates, lineId) => {
      if (!lineIsDrawn[lineId]) {
        return;
      }

      coordinates.map((coordinate, index) => {
        const { x, y } = coordinate;

        if (isHold) {
          return;
        }

        if (Math.pow(offsetX - x, 2) + Math.pow(offsetY - y, 2) <= 81) {
          switch (lineId) {
            case 0:
              canvasStorage[lineId].contextRef.current.strokeStyle = '#2231B8';
              drawMark(canvasStorage[lineId].contextRef, graphicData[lineId][index], coordinate);

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 1:
              canvasStorage[lineId].contextRef.current.strokeStyle = '#902222';
              drawMark(canvasStorage[lineId].contextRef, graphicData[lineId][index], coordinate);

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 2:
              canvasStorage[lineId].contextRef.current.strokeStyle = '#53238F';
              drawMark(canvasStorage[lineId].contextRef, graphicData[lineId][index], coordinate);

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 3:
              canvasStorage[lineId].contextRef.current.strokeStyle = '#D9BC25';
              drawMark(canvasStorage[lineId].contextRef, graphicData[lineId][index], coordinate);

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 4:
              canvasStorage[lineId].contextRef.current.strokeStyle = '#21A1CA';
              drawMark(canvasStorage[lineId].contextRef, graphicData[lineId][index], coordinate);

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;
            default:
              break;
          }
        }
      });
    });

    if (isHold && Math.pow(offsetX - holdX, 2) + Math.pow(offsetY - holdY, 2) > 81) {
      isHold = false;

      switch (holdLineNum) {
        case 0:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = '#2231B8';
          canvasStorage[holdLineNum].contextRef.current.fillStyle = '#2231B8';

          refreshLine(canvasStorage[holdLineNum].contextRef, convertCoordinates[holdLineNum]);
          break;

        case 1:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = '#902222';
          canvasStorage[holdLineNum].contextRef.current.fillStyle = '#902222';
          refreshLine(canvasStorage[holdLineNum].contextRef, convertCoordinates[holdLineNum]);
          break;

        case 2:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = '#53238F';
          canvasStorage[holdLineNum].contextRef.current.fillStyle = '#53238F';
          refreshLine(canvasStorage[holdLineNum].contextRef, convertCoordinates[holdLineNum]);
          break;

        case 3:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = '#D9BC25';
          canvasStorage[holdLineNum].contextRef.current.fillStyle = '#D9BC25';
          refreshLine(canvasStorage[holdLineNum].contextRef, convertCoordinates[holdLineNum]);
          break;

        case 4:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = '#21A1CA';
          canvasStorage[holdLineNum].contextRef.current.fillStyle = '#21A1CA';
          refreshLine(canvasStorage[holdLineNum].contextRef, convertCoordinates[holdLineNum]);

          break;
        default:
          break;
      }
    }
  };

  const animation = (contextRef, coordinates) => {
    setDrawing(true);

    contextRef.current.lineWidth = 3; // Line Settings

    contextRef.current.beginPath(); // Set origin
    contextRef.current.moveTo(coordinates[0].x, coordinates[0].y);

    let i = 0;
    let y = 0;
    let x = coordinates[i].x;

    let timerId = setInterval(() => {
      y = lenearFunction(
        x,
        coordinates[i].x,
        coordinates[i + 1].x,
        coordinates[i].y,
        coordinates[i + 1].y
      );

      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();

      contextRef.current.beginPath(); // Чтобы не появлялись "лесенки" при отрисовки графика
      contextRef.current.arc(x, y, 1, 0, Math.PI * 2);
      contextRef.current.fill();

      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);

      x += 3; // Step for Animation

      if (x > coordinates[i + 1].x) {
        i++;

        if (i > coordinates.length - 2) {
          clearInterval(timerId);
          setDrawing(false);
        }
        x = coordinates[i].x;
      }
    }, 6);

    return timerId;
  };

  const onClick = lineId => {
    switch (lineId) {
      case 0:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = '#2231B8'; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = '#2231B8';

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId]
          );
          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 1:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = '#902222'; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = '#902222';

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId]
          );
          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 2:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = '#53238F'; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = '#53238F';

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId]
          );
          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 3:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = '#D9BC25'; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = '#D9BC25';

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId]
          );
          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 4:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = '#21A1CA'; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = '#21A1CA';

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId]
          );
          setTimerIdStore([...timerIdStore]);
        }
        break;

      default:
        break;
    }

    if (lineIsDrawn[lineId]) {
      lineIsDrawn[lineId] = false;
      setLineIsDrawn([...lineIsDrawn]);
    } else {
      lineIsDrawn[lineId] = true;
      setLineIsDrawn([...lineIsDrawn]);
    }
  };

  return (
    <div>
      <button type='button' onClick={() => onClick(0)}>
        Random query 1
      </button>
      <button type='button' onClick={() => onClick(1)}>
        Random query 2
      </button>
      <button type='button' onClick={() => onClick(2)}>
        Random query 3
      </button>
      <button type='button' onClick={() => onClick(3)}>
        Random query 4
      </button>
      <button type='button' onClick={() => onClick(4)}>
        Random query 5
      </button>

      <canvas ref={canvasStorage[5].canvasRef} style={style} onMouseMove={listener}></canvas>
      <canvas ref={canvasStorage[0].canvasRef} style={styleTwo} onMouseMove={listener}></canvas>
      <canvas ref={canvasStorage[1].canvasRef} style={styleTwo} onMouseMove={listener}></canvas>
      <canvas ref={canvasStorage[2].canvasRef} style={styleTwo} onMouseMove={listener}></canvas>
      <canvas ref={canvasStorage[3].canvasRef} style={styleTwo} onMouseMove={listener}></canvas>
      <canvas ref={canvasStorage[4].canvasRef} style={styleTwo} onMouseMove={listener}></canvas>
    </div>
  );
};
// C R I N G E T R O L L I N G   END
