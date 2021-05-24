import React from "react";
import styles from "./YoutubeList.module.css";
import youtubeIcon from "../../../static/images/search/youtube_icon.svg";
import arrow from "../../../static/images/search/arrow.svg";
import fakeYoutube from "../../../static/images/search/fake_youtube.svg";

export const YoutubeList = ({ youtubeItems }) => {
  return (
    <div className={styles.response_section}>
      <h1>
        <img src={youtubeIcon} alt="nothing" /> YouTube{" "}
        <img src={arrow} alt="nothing" />
      </h1>
      {youtubeItems.map(youtubeItem => (
        <div className={styles.youtube_block} key={youtubeItem.id}>
          <img src={fakeYoutube} alt="nothing" />
          <ul>
            <li>
              <h2>ПостНаука</h2>
            </li>
            <li>
              <p1>743 тыс. подписчиков • 3 353 видео</p1>
            </li>
            <li>
              <p>Официальное представительство проекта "ПостНаука"...</p>
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
