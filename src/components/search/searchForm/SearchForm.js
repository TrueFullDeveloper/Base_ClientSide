import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchResponse } from "../../../reduxToolkit/SliceWithAPI/searchSlice";
import styles from "./SearchForm.module.css";

export const SearchForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const submitHandler = event => {
    event.preventDefault();
    dispatch(fetchResponse(value));
  };

  return (
    <form>
      <div className={styles.search_form}>
        <p>
          Мы готовы предоставим необходимую для вас
          <br /> информацию, в рамках заданной вами темы.
        </p>
        <input
          type="search"
          placeholder="Поиск по теме"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit" onClick={submitHandler}>
          <Link to="/search">Поиск</Link>
        </button>
      </div>
    </form>
  );
};
