import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  selectResetLoading,
} from "../../reduxToolkit/SliceWithAPI/passwordResetSlice";
import { selectPassword } from "../../reduxToolkit/SliceWithAPI/authSlice";
import { Loader } from "../../components/loader/Loader";
import styles from "./PasswordChange.module.css";
import firstEllipse from "../../static/images/auth/ellipse.png";
import secondEllipse from "../../static/images/auth/ellipse_2.png";
import successfulIcon from "../../static/images/auth/successful_icon.svg";

export const PasswordChange = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    passwordRep: "",
  });

  const dispatch = useDispatch();
  const password = useSelector(selectPassword);
  const loading = useSelector(selectResetLoading);
  const [step, setStep] = useState(1);

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    if (
      form.oldPassword === password &&
      form.newPassword === form.passwordRep
    ) {
      dispatch(
        changePassword({
          newPasswod: form.newPassword,
          newPasswodRep: form.passwordRep,
        })
      );
      setStep(2);
    }
  };

  if (loading) {
    return (
      <Fragment>
        <div className={styles.background_ellipse_1}>
          <img src={firstEllipse} alt="nothing" />
        </div>

        <div className={styles.background_ellipse_2}>
          <img src={secondEllipse} alt="nothing" />
        </div>

        <Loader />
      </Fragment>
    );
  }

  if (step === 1) {
    return (
      <Fragment>
        <div className={styles.background_ellipse_1}>
          <img src={firstEllipse} alt="nothing" />
        </div>

        <div className={styles.background_ellipse_2}>
          <img src={secondEllipse} alt="nothing" />
        </div>

        <form className={styles.change_password_form}>
          <h1>Смена пароля</h1>
          <input
            placeholder="Старый Пароль"
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={form.oldPassword}
            onChange={onChange}
          />
          <input
            placeholder="Новый Пароль"
            type="password"
            id="newPassword"
            name="newPassword"
            value={form.newPassword}
            onChange={onChange}
          />
          <input
            placeholder="Повторите Пароль"
            type="password"
            id="passwordRep"
            name="passwordRep"
            value={form.passwordRep}
            onChange={onChange}
          />
          <button type="button" onClick={onClick}>
            Сменить
          </button>
        </form>
      </Fragment>
    );
  }

  if (step === 2) {
    return (
      <Fragment>
        <div className={styles.background_ellipse_1}>
          <img src={firstEllipse} alt="nothing" />
        </div>

        <div className={styles.background_ellipse_2}>
          <img src={secondEllipse} alt="nothing" />
        </div>

        <div className={styles.successful_form}>
          <h1>Вы успешно изменили свой пароль!</h1>
          <img src={successfulIcon} alt="nothing" />
          <button type="submit">
            <Link to="/login">Ок</Link>
          </button>
        </div>
      </Fragment>
    );
  }
};
