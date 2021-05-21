//TODO: Transfer it to Constants.js
const DIAGRAM_COLORS = ["#2231B8", "#902222", "#53238F", "#D9BC25", "#21A1CA"];
const DIAGRAM_RADIUS = 176;
const CIRCLE_CENTER = 300;

// Not Export
const getAngles = data => {
  let totalValue = 0;
  let startAngle = 0;

  let allPercent = [];
  let anglesArray = [];

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

  allPercent.map(percent => {
    anglesArray.push({
      start: startAngle,
      end: startAngle + ((Math.PI / 180) * percent * 360) / 100,
    });

    startAngle = startAngle + ((Math.PI / 180) * percent * 360) / 100;
  });

  return anglesArray; // In Radians
};

// Not Export
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

export const drawDiagram = (diagramRef, queryData) => {
  const anglesArray = getAngles(queryData);

  // Set Payload
  const payload = anglesArray;

  anglesArray.map((sector, index) => {
    diagramRef.current.fillStyle = DIAGRAM_COLORS[index];

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

  return payload;
};

export const diagramExpand = (diagramRef, x, y, digramAngles) => {
  // Circle Validation
  if (
    Math.pow(x - CIRCLE_CENTER, 2) + Math.pow(y - CIRCLE_CENTER, 2) >
    Math.pow(DIAGRAM_RADIUS, 2)
  ) {
    return;
  }

  diagramRef.current.clearRect(0, 0, 600, 600);

  // TODO: Add Logic for Angle
  const sectorNumber = getSectorByCoordinates(x, y, digramAngles);

  const CORRECT_ANGLE = 6 * (Math.PI / 180);

  // Arcs of a Circle

  digramAngles.map((sector, index) => {
    diagramRef.current.fillStyle = DIAGRAM_COLORS[index];

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

  digramAngles.map((sector, index) => {
    diagramRef.current.fillStyle = DIAGRAM_COLORS[index];
    diagramRef.current.strokeStyle = DIAGRAM_COLORS[index];
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

  drawLineLable(diagramRef, x, y); // Draw Piece of Label

  // TODO:  diapach EXPAND_DIAGRAM
};

export const getSectorByCoordinates = (x, y, digramAngles) => {
  let clickAngle;
  let sectorNumber = 0;

  let degreesArray = [];

  digramAngles.map(sector => {
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
