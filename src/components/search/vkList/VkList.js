import React from "react";
import styles from "./VkList.module.css";
import vkIcon from "../../../static/images/search/vk_icon.svg";
import arrow from "../../../static/images/search/arrow.svg";
import fakeVk from "../../../static/images/search/fake_vk.svg";

export const VkList = ({ vkItems }) => {
  return (
    <div className={styles.response_section}>
      <h1>
        <img src={vkIcon} alt="nothing" /> Вконтате{" "}
        <img src={arrow} alt="nothing" />
      </h1>
      {vkItems.map(vkItem => (
        <div className={styles.vk_block} key={vkItem.id}>
          <img src={fakeVk} alt="nothing" />
          <ul>
            <li>
              <h2>9GAG</h2>
            </li>
            <li>
              <p>memeslivesmater</p>
            </li>
            <li>
              <p1>1 662 678 подписчиков</p1>
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
