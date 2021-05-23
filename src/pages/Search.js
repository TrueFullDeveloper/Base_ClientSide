import React, { Fragment } from "react";
import { SearchForm } from "../components/search/SearchForm";
import { VkList } from "../components/search/VkList";
import { TelegramList } from "../components/search/TelegramList";
import { YoutubeList } from "../components/search/YoutubeList";
import { BookList } from "../components/search/BookList";
import { Loader } from "../components/loader/Loader";
import { useSelector } from "react-redux";
import {
  selectResponseList,
  selectSearchLoading,
} from "../reduxToolkit/SliceWithAPI/searchSlice";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export const Search = () => {
  const responseList = useSelector(selectResponseList);
  const loading = useSelector(selectSearchLoading);

  return (
    <Fragment>
      <Header />
      <SearchForm />
      {loading ? ( // Клятые скобки, которые добавляет Prittier,
        <Loader /> // потом сохраню файл без Prittier
      ) : (
        <Fragment>
          <VkList vkItems={responseList} />
          <TelegramList telegramItems={responseList} />
          <YoutubeList youtubeItems={responseList} />
          <BookList bookItems={responseList} />
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};
