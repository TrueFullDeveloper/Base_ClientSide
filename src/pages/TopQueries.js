import React, { Fragment, useContext, useEffect, useState } from "react";
import { QueryList } from "../components/topqueries/QueryList";
import { Loader } from "../components/loader/Loader";
import { PostgresContext } from "../context/postgresql/PostgresContext";
import { QueryGraphic } from "../components/topqueries/QueryGraphic";
import { QueryDiagram } from "../components/topqueries/QueryDiagram";
import { DiagramLabel } from "../components/topqueries/DiagramLabel";
import { ExpandHeader } from "../components/topqueries/ExpandHeader";
import { ExpandHeaderContext } from "../context/expandHeader/ExpandHeaderContext";

export const TopQueries = () => {
  const { fetchQueries, topQueriesData, loading } = useContext(PostgresContext);

  const { periodType } = useContext(ExpandHeaderContext);

  // May Be Add TopQueries Context?
  const [queryContent, setQueryContent] = useState([]);
  const [numberOfQuery, setNumberOfQuery] = useState([]);

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (periodType) {
      case "day":
        setQueryContent(topQueriesData.day.queryContent);
        setNumberOfQuery(topQueriesData.day.numberOfQuery);
        break;

      case "week":
        setQueryContent(topQueriesData.week.queryContent);
        setNumberOfQuery(topQueriesData.week.numberOfQuery);
        break;

      case "month":
        setQueryContent(topQueriesData.month.queryContent);
        setNumberOfQuery(topQueriesData.month.numberOfQuery);
        break;

      default:
        break;
    }

    console.log(queryContent);
    console.log(numberOfQuery);
  }, [periodType]);

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
          <QueryList queryContent={queryContent} />
          <QueryGraphic numberOfQuery={numberOfQuery} />
          <QueryDiagram numberOfQuery={numberOfQuery} />
          <DiagramLabel queryContent={queryContent} />
        </Fragment>
      )}
    </Fragment>
  );
};
