import React, { Fragment, useEffect, useState } from "react";
import { QueryList } from "../components/topqueries/QueryList";
import { Loader } from "../components/loader/Loader";
import { QueryGraphic } from "../components/topqueries/QueryGraphic";
import { QueryDiagram } from "../components/topqueries/QueryDiagram";
import { DiagramLabel } from "../components/topqueries/DiagramLabel";
import { ExpandHeader } from "../components/topqueries/ExpandHeader";
import { useSelector, useDispatch } from "react-redux";
import {
  selectQueriesData,
  selectQueriesLoading,
  fetchQueries,
} from "../reduxToolkit/SliceWithAPI/topQueriesSlice";
import { selectPeriodType } from "../reduxToolkit/Slice/expandHeaderSlice";

export const TopQueries = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectQueriesLoading);
  const topQueriesData = useSelector(selectQueriesData);
  const periodType = useSelector(selectPeriodType);

  // const [queryContent, setQueryContent] = useState([]);
  // const [numberOfQuery, setNumberOfQuery] = useState([]);
  let queryContent = [];
  let numberOfQuery = [];

  useEffect(() => {
    dispatch(fetchQueries());
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   switch (periodType) {
  //     case "day":
  //       // setQueryContent(topQueriesData.day.queryContent);
  //       // setNumberOfQuery(topQueriesData.day.numberOfQuery);
  //       queryContent = topQueriesData.day.queryContent;
  //       numberOfQuery = topQueriesData.day.numberOfQuery;
  //       break;

  //     case "week":
  //       // setQueryContent(topQueriesData.week.queryContent);
  //       // setNumberOfQuery(topQueriesData.week.numberOfQuery);
  //       queryContent = topQueriesData.week.queryContent;
  //       numberOfQuery = topQueriesData.week.numberOfQuery;
  //       break;

  //     case "month":
  //       // setQueryContent(topQueriesData.month.queryContent);
  //       // setNumberOfQuery(topQueriesData.month.numberOfQuery);
  //       queryContent = topQueriesData.month.queryContent;
  //       numberOfQuery = topQueriesData.month.numberOfQuery;
  //       break;

  //     default:
  //       break;
  //   }

  //   console.log("From Top Queries", numberOfQuery);
  //   console.log("From Top Queries", topQueriesData);
  //   console.log("From Top Queries", periodType);
  // }, [periodType]);

  // !!!
  // TODO: Correct the Logic for the List of Queries
  // !!!

  return (
    <Fragment>
      <ExpandHeader />
      <div>Top Queries</div>

      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <Fragment>
          <QueryList topQueriesData={topQueriesData} />
          <QueryGraphic topQueriesData={topQueriesData} />
          <QueryDiagram topQueriesData={topQueriesData} />
          {/* <DiagramLabel topQueriesData={topQueriesData} /> */}
        </Fragment>
      )}
    </Fragment>
  );
};
