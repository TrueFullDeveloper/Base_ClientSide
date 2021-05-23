import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../reduxToolkit/SliceWithAPI/authSlice";
import styles from "./Login.module.css";
import firstEllipse from "../../static/images/auth/ellipse.png";
import secondEllipse from "../../static/images/auth/ellipse_2.png";

export const Login = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    dispatch(fetchLogin({ email: form.email, password: form.password }));
  };

  return (
    <Fragment>
      <div className={styles.background_ellipse_1}>
        <img src={firstEllipse} alt="nothing" />
      </div>

      <div className={styles.background_ellipse_2}>
        <img src={secondEllipse} alt="nothing" />
      </div>

      <form className={styles.login_form}>
        <h1>Авторизация</h1>
        <input
          placeholder="Почта"
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={onChange}
        />
        <input
          placeholder="Пароль"
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={onChange}
        />
        <button type="submit" onClick={onClick}>
          Войти
        </button>

        <Link to="/passwordrecovery">Забыли пароль?</Link>
        <br />
        <br />
        <Link to="/signin">Регистрация</Link>
      </form>
    </Fragment>
  );
};
