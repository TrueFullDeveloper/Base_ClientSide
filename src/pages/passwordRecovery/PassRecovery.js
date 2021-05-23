import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import {
  changePassword,
  sendEmail,
  selectResetCod,
  selectResetLoading,
} from "../../reduxToolkit/SliceWithAPI/passwordResetSlice";
import styles from "./PasswordRecovery.module.css";
import firstEllipse from "../../static/images/auth/ellipse.png";
import secondEllipse from "../../static/images/auth/ellipse_2.png";
import successfulIcon from "../../static/images/auth/successful_icon.svg";

export const PassRecovery = () => {
  const dispatch = useDispatch();

  const cod = useSelector(selectResetCod);
  const loading = useSelector(selectResetLoading);

  const onClick = () => {
    if (step === 1) {
      dispatch(sendEmail(form.email));
      setStep(2);
    }

    if (step === 2) {
      if (form.cod === cod && form.password === form.passwordRep) {
        dispatch(
          changePassword({
            newPasswod: form.password,
            newPasswodRep: form.passwordRep,
          })
        );
        setStep(3);
      }
    }
  };

  const [form, setForm] = useState({
    email: "",
    cod: "",
    password: "",
    passwordRep: "",
  });

  const [step, setStep] = useState(1);

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
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

        <form className={styles.first_form}>
          <h1>Забыли пароль?</h1>
          <p>
            Для восстановления пароля укажите e-mail, на
            <br /> который зарегистрирована ваша учетная запись!
          </p>
          <input
            placeholder="Почта"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={onChange}
          />
          <button type="button" onClick={onClick}>
            Отправить
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

        <form className={styles.second_form}>
          <h1>Введите код</h1>
          <p>
            Введите код для подтверждения сброса пароля.
            <br /> Код был выслан на указанный вами адрес
            <br /> электронной почты!
          </p>
          <input
            placeholder="Код"
            type="text"
            id="cod"
            name="cod"
            value={form.cod}
            onChange={onChange}
          />
          <input
            placeholder="Новый Пароль"
            type="password"
            id="password"
            name="password"
            value={form.password}
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
            Востановить
          </button>
        </form>
      </Fragment>
    );
  }

  if (step === 3) {
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
