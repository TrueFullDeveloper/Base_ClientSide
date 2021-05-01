import React, { Fragment, useContext, useEffect } from "react";
import { QueryList } from "../components/topqueries/QueryList";
import { Loader } from "../components/loader/Loader";
import { PostgresContext } from "../context/postgresql/PostgresContext";
import { QueryGraphic } from "../components/topqueries/QueryGraphic";
import { QueryDiagram } from "../components/topqueries/QueryDiagram";
import { DiagramLabel } from "../components/topqueries/DiagramLabel";
import { ExpandHeader } from "../components/topqueries/ExpandHeader";

export const TopQueries = () => {
  const { fetchQueries, queries, graphicData, loading } = useContext(
    PostgresContext
  );

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <ExpandHeader />
      <div>Top Queries</div>

      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <Fragment>
          <QueryList queries={queries} />
          <QueryGraphic graphicData={graphicData} />
          <QueryDiagram graphicData={graphicData} />
          <DiagramLabel />
        </Fragment>
      )}
    </Fragment>
  );
};
