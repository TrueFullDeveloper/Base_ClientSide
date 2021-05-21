import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  selectResetLoading,
} from "../reduxToolkit/SliceWithAPI/passwordResetSlice";
import { selectPassword } from "../reduxToolkit/SliceWithAPI/authSlice";
import { Loader } from "../components/loader/Loader";

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
      dispatch(changePassword(form.newPassword));
      setStep(2);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (step === 1) {
    return (
      <form>
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
    );
  }
  if (step === 2) {
    return (
      <div>
        <h1>Вы успешно изменили свой пароль!</h1>
        <button type="button">
          <Link to="/">Ок</Link>
        </button>
      </div>
    );
  }
};
