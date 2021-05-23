import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  profileUpdate,
  selectProfile,
} from "../../reduxToolkit/SliceWithAPI/profileSlice";
import { userLogout } from "../../reduxToolkit/SliceWithAPI/authSlice";
import styles from "./ProfileForm.module.css";
import avatar from "../../static/images/profile/avatar.svg";
import logout from "../../static/images/profile/logout.svg";
import ecllipse from "../../static/images/profile/ellipse.png";
import blackHole from "../../static/images/profile/black_hole.png";

export const ProfileForm = () => {
  const profileData = useSelector(selectProfile);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    userName: profileData.userName,
    email: profileData.email,
    telegram: profileData.telegram,
  });

  useEffect(() => {
    const onKeypress = event => {
      if (event.code === "Enter") {
        dispatch(profileUpdate({ ...form }));
      }
    };
    document.addEventListener("keyup", onKeypress);

    return () => {
      document.removeEventListener("keyup", onKeypress);
    };
  }, [form, dispatch]);

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <Fragment>
      <div className={styles.background_ellipse}>
        <img src={ecllipse} alt="nothing" />
      </div>

      <div className={styles.background_black_hole}>
        <img src={blackHole} alt="nothing" />
      </div>

      <div className={styles.profile}>
        <div className={styles.avatar}>
          <h1>Ваш Профиль</h1>
          <img src={avatar} />
          <h2>Cezar</h2>
        </div>

        <form
          className={styles.profile_form}
          onSubmit={event => event.preventDefault()}
        >
          <div className={styles.profile_item}>
            <span>Имя</span>
            <input
              type="text"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={onChange}
            />
          </div>
          <div className={styles.profile_item}>
            <span>Почта</span>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
          </div>
          <div className={styles.profile_item}>
            <span>Телеграмм</span>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={form.telegram}
              onChange={onChange}
            />
          </div>
          <div>
            <button type="submit">
              <Link to="/passworchange">Сменить пароль</Link>
            </button>
            <button
              className={styles.logout_button}
              onClick={() => dispatch(userLogout())}
            >
              <img src={logout} />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
