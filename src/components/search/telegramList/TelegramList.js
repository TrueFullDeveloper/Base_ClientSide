import React from "react";
import styles from "./TelegramList.module.css";
import telegramIcon from "../../../static/images/search/telegramm_icon.svg";
import arrow from "../../../static/images/search/arrow.svg";
import fakeTelegram from "../../../static/images/search/fake_telegram.svg";

export const TelegramList = ({ telegramItems }) => {
  return (
    <div className={styles.response_section}>
      <h1>
        <img src={telegramIcon} alt="nothing" /> YouTube{" "}
        <img src={arrow} alt="nothing" />
      </h1>
      {telegramItems.map(telegramItem => (
        <div className={styles.telegram_block} key={telegramItem.id}>
          <img src={fakeTelegram} alt="nothing" />
          <ul>
            <li>
              <h2>ХШ</h2>
            </li>
            <li>
              <p1>Мечтаешь научиться рисовать? Тогда...</p1>
            </li>
            <li>
              <p>1 662 678 подписчиков</p>
            </li>
          </ul>
          <button>
            <a href="#">Перейти</a>
          </button>
        </div>
      ))}
    </div>
  );
};
