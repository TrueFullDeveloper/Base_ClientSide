import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectPeriodType } from "../../reduxToolkit/Slice/expandHeaderSlice";
import { selectLabel } from "../../reduxToolkit/Slice/labelSlice";

const styles = {
  labelBlock: {
    position: "absolute",
    width: "120px",
    height: "141px",
    background: "#888888",
    borderRadius: "10px",

    color: "#000000",
  },

  labelCircle: {
    width: "52.87px",
    height: "52.87px",
    borderRadius: "26px",
    background: "#21A1CA",
    marginLeft: "33px",
    marginTop: "-33px",
  },

  h1: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.05em",

    textAlign: "center",
  },

  p: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "10px",
    lineHeight: "12px",

    marginLeft: "15px",
  },
};

export const DiagramLabel = ({ topQueriesData }) => {
  const { visible, sectorNumber, coordinates } = useSelector(selectLabel);
  //!!!
  // TODO: Modify Component
  //!!!

  const periodType = useSelector(selectPeriodType);

  const [queryContent, setQueryContent] = useState([]);

  useEffect(() => {
    switch (periodType) {
      case "day":
        setQueryContent(topQueriesData.day.queryContent);
        break;

      case "week":
        setQueryContent(topQueriesData.week.queryContent);
        break;

      case "month":
        setQueryContent(topQueriesData.month.queryContent);
        break;

      default:
        break;
    }
  }, [periodType]);

  return (
    <div style={styles.labelBlock}>
      <div style={styles.labelCircle}>
        {/* <img src="../../../static/images/curves.jpg" alt="None" /> */}
      </div>
      <h1 style={styles.h1}>"Рандом"</h1>
      <p style={styles.p}>
        Запрос по этой теме совершался 2020 раз, что составляет внушительные 33%
        от всех запросов!
      </p>
    </div>
  );
};
