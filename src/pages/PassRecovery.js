import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../components/loader/Loader";
import {
  changePassword,
  sendEmail,
  selectResetCod,
} from "../reduxToolkit/SliceWithAPI/passwordResetSlice";

export const PassRecovery = () => {
  const dispatch = useDispatch();
  const { loading, cod } = useSelector(selectResetCod);

  const onClick = () => {
    if (step === 1) {
      dispatch(sendEmail(form.email));
      setStep(2);
    }

    if (step === 2) {
      if (form.cod === cod && form.password === form.passwordRep) {
        dispatch(changePassword(form.password));
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
    return <Loader />;
  }

  if (step === 1) {
    return (
      <form>
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
    );
  }

  if (step === 2) {
    return (
      <form>
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
    );
  }

  if (step === 3) {
    return (
      <div>
        <h1>Вы успешно изменили свой пароль!</h1>
        <button type="button">
          <Link to="/login">Ок</Link>
        </button>
      </div>
    );
  }
};
