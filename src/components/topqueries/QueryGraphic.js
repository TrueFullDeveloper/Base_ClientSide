import React, { useEffect, useRef, useState, useContext } from "react";
import { ExpandHeaderContext } from "../../context/expandHeader/ExpandHeaderContext";
import { GraphicContext } from "../../context/graphic/GraphicContext";
// C R I N G E   T R O L L I N G   BEGIN

const style = {
  width: "720px",
  height: "480px",
  background: "#2D2D2D",
  borderRadius: "10px",
  marginLeft: "40px",
  marginBottom: "80px",
};
const styleTwo = {
  width: "720px",
  height: "480px",
  position: "absolute",
  top: "305px",
  left: "40px",
};

export const QueryGraphic = ({ graphicData }) => {
  const { periodType } = useContext(ExpandHeaderContext);

  const {
    setGraphic,
    refreshLine,
    drawMark,
    lenearFunction,
    convertCoordinates,
  } = useContext(GraphicContext);

  console.log(convertCoordinates);

  let isHold = false;
  let holdX, holdY;
  let holdLineNum;
  let canvasStorage = [];

  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });
  canvasStorage.push({ canvasRef: useRef(null), contextRef: useRef(null) });

  // Flags for Listener and OnClick Function
  const [lineIsDrawing, setLineIsDrawing] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const [lineIsDrawn, setLineIsDrawn] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [timerIdStore, setTimerIdStore] = useState(Array(5));

  useEffect(() => {
    canvasStorage.map((canvItem) => {
      canvItem.canvasRef.current.width = 720;
      canvItem.canvasRef.current.height = 480;

      canvItem.contextRef.current = canvItem.canvasRef.current.getContext("2d");
    });

    setGraphic(graphicData, periodType, canvasStorage[5].contextRef);
  }, [periodType]);

  const animation = (contextRef, coordinates, lineId) => {
    lineIsDrawing[lineId] = true;
    setLineIsDrawing([...lineIsDrawing]);

    let i = 0;
    let y = 0;
    let x = coordinates[i].x;

    contextRef.current.lineWidth = 3; // Line Settings
    contextRef.current.beginPath(); // Set origin
    contextRef.current.moveTo(coordinates[0].x, coordinates[0].y);

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

          lineIsDrawing[lineId] = false;
          setLineIsDrawing([...lineIsDrawing]);
        }
        x = coordinates[i].x;
      }
    }, 6);

    return timerId;
  };

  const listener = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    convertCoordinates.map((coordinates, lineId) => {
      if (!lineIsDrawn[lineId] || lineIsDrawing[lineId]) {
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
              canvasStorage[lineId].contextRef.current.strokeStyle = "#2231B8";
              drawMark(
                canvasStorage[lineId].contextRef,
                graphicData[lineId][index],
                coordinate
              );

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 1:
              canvasStorage[lineId].contextRef.current.strokeStyle = "#902222";
              drawMark(
                canvasStorage[lineId].contextRef,
                graphicData[lineId][index],
                coordinate
              );

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 2:
              canvasStorage[lineId].contextRef.current.strokeStyle = "#53238F";
              drawMark(
                canvasStorage[lineId].contextRef,
                graphicData[lineId][index],
                coordinate
              );

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 3:
              canvasStorage[lineId].contextRef.current.strokeStyle = "#D9BC25";
              drawMark(
                canvasStorage[lineId].contextRef,
                graphicData[lineId][index],
                coordinate
              );

              holdX = coordinate.x;
              holdY = coordinate.y;

              isHold = true;
              holdLineNum = lineId;
              break;

            case 4:
              canvasStorage[lineId].contextRef.current.strokeStyle = "#21A1CA";
              drawMark(
                canvasStorage[lineId].contextRef,
                graphicData[lineId][index],
                coordinate
              );

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

    if (
      isHold &&
      Math.pow(offsetX - holdX, 2) + Math.pow(offsetY - holdY, 2) > 81
    ) {
      isHold = false;

      switch (holdLineNum) {
        case 0:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = "#2231B8";
          canvasStorage[holdLineNum].contextRef.current.fillStyle = "#2231B8";

          refreshLine(
            canvasStorage[holdLineNum].contextRef,
            convertCoordinates[holdLineNum]
          );
          break;

        case 1:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = "#902222";
          canvasStorage[holdLineNum].contextRef.current.fillStyle = "#902222";

          refreshLine(
            canvasStorage[holdLineNum].contextRef,
            convertCoordinates[holdLineNum]
          );
          break;

        case 2:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = "#53238F";
          canvasStorage[holdLineNum].contextRef.current.fillStyle = "#53238F";

          refreshLine(
            canvasStorage[holdLineNum].contextRef,
            convertCoordinates[holdLineNum]
          );
          break;

        case 3:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = "#D9BC25";
          canvasStorage[holdLineNum].contextRef.current.fillStyle = "#D9BC25";

          refreshLine(
            canvasStorage[holdLineNum].contextRef,
            convertCoordinates[holdLineNum]
          );
          break;

        case 4:
          canvasStorage[holdLineNum].contextRef.current.strokeStyle = "#21A1CA";
          canvasStorage[holdLineNum].contextRef.current.fillStyle = "#21A1CA";

          refreshLine(
            canvasStorage[holdLineNum].contextRef,
            convertCoordinates[holdLineNum]
          );
          break;

        default:
          break;
      }
    }
  };

  const onClick = (lineId) => {
    switch (lineId) {
      case 0:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = "#2231B8"; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = "#2231B8";

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId],
            lineId
          );

          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 1:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = "#902222"; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = "#902222";

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId],
            lineId
          );

          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 2:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = "#53238F"; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = "#53238F";

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId],
            lineId
          );

          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 3:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = "#D9BC25"; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = "#D9BC25";

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId],
            lineId
          );

          setTimerIdStore([...timerIdStore]);
        }
        break;

      case 4:
        if (lineIsDrawn[lineId]) {
          clearInterval(timerIdStore[lineId]);
          canvasStorage[lineId].contextRef.current.clearRect(0, 0, 720, 480);
        } else {
          canvasStorage[lineId].contextRef.current.strokeStyle = "#21A1CA"; // Line Setting
          canvasStorage[lineId].contextRef.current.fillStyle = "#21A1CA";

          timerIdStore[lineId] = animation(
            canvasStorage[lineId].contextRef,
            convertCoordinates[lineId],
            lineId
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
      <button type="button" onClick={() => onClick(0)}>
        Random query 1
      </button>
      <button type="button" onClick={() => onClick(1)}>
        Random query 2
      </button>
      <button type="button" onClick={() => onClick(2)}>
        Random query 3
      </button>
      <button type="button" onClick={() => onClick(3)}>
        Random query 4
      </button>
      <button type="button" onClick={() => onClick(4)}>
        Random query 5
      </button>

      <canvas
        ref={canvasStorage[5].canvasRef}
        style={style}
        onMouseMove={listener}
      ></canvas>
      <canvas
        ref={canvasStorage[0].canvasRef}
        style={styleTwo}
        onMouseMove={listener}
      ></canvas>
      <canvas
        ref={canvasStorage[1].canvasRef}
        style={styleTwo}
        onMouseMove={listener}
      ></canvas>
      <canvas
        ref={canvasStorage[2].canvasRef}
        style={styleTwo}
        onMouseMove={listener}
      ></canvas>
      <canvas
        ref={canvasStorage[3].canvasRef}
        style={styleTwo}
        onMouseMove={listener}
      ></canvas>
      <canvas
        ref={canvasStorage[4].canvasRef}
        style={styleTwo}
        onMouseMove={listener}
      ></canvas>
    </div>
  );
};
// C R I N G E T R O L L I N G   END
