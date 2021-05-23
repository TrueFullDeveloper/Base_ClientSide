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
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export const TopQueries = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectQueriesLoading);
  const topQueriesData = useSelector(selectQueriesData);

  useEffect(() => {
    dispatch(fetchQueries());
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Header />
      <ExpandHeader />

      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <Fragment>
          <QueryList topQueriesData={topQueriesData} />
          <QueryGraphic topQueriesData={topQueriesData} />
          <QueryDiagram topQueriesData={topQueriesData} />
          <DiagramLabel topQueriesData={topQueriesData} />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
