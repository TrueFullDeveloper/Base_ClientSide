import React from "react";
import styles from "./BookList.module.css";
import bookIcon from "../../../static/images/search/book_icon.svg";
import arrow from "../../../static/images/search/arrow.svg";
import fakeBook from "../../../static/images/search/fake_book.png";
import bookStar from "../../../static/images/search/book_star.svg";

export const BookList = ({ bookItems }) => {
  return (
    <div className={styles.response_section}>
      <h1>
        <img src={bookIcon} alt="nothing" /> Книги{" "}
        <img src={arrow} alt="nothing" />
      </h1>

      {bookItems.map(bookItem => (
        <div className={styles.book_block} key={bookItem.id}>
          <div className={styles.first_book_section}>
            <img src={fakeBook} alt="nothing" />
            <button>
              <a href="#">Перейти</a>
            </button>
          </div>

          <div className={styles.second_book_section}>
            <h1>Python. Карманный справочник</h1>
            <h2>Луц М.</h2>

            <div>
              <h3>
                <img src={bookStar} alt="nothing" /> 5.0
              </h3>
            </div>

            <div className={styles.book_data}>
              <div>
                <ul className={styles.grey_color}>
                  <li>Издательство</li>
                  <li>Год издания</li>
                  <li>Кол-во страниц</li>
                  <li>Тираж</li>
                  <li>Вес, г</li>
                </ul>
              </div>
              <div>
                <ul className={styles.white_color}>
                  <li>Вильямсий Издательский дом</li>
                  <li>2019</li>
                  <li>320</li>
                  <li>8000</li>
                  <li>460</li>
                </ul>
              </div>
            </div>

            <div className={styles.annotation}>
              <h2>Аннотация</h2>
              <p>
                Этот краткий справочник по Python карманного типа обновлен с
                учетом версий 3.4 и 2.7 и очень удобен для наведения быстрых
                справок в процессе разработки программ на Python. В лаконичной
                форме здесь представлены все необходимые сведения о типах данных
                и операторах Python, специальных методах, встроенных функциях и
                исключениях, наиболее употребительных стандартных библиотечных
                модулях и других примечательных языковых средствах Python.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
