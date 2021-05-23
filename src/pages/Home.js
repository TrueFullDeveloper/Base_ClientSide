import React, { Fragment } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { SearchForm } from "../components/search/SearchForm";

export const Home = () => {
  return (
    <Fragment>
      <Header />
      <SearchForm />
      <Footer />
    </Fragment>
  );
};
