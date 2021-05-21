import React, { useState } from "react";
import { Link } from "react-router-dom";

export const PasswordChange = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    passwordRep: "",
  });

  const [step, setStep] = useState(1);

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    // if (
    //   form.oldPassword === password &&
    //   form.newPassword === form.passwordRep
    // ) {
    passwordChange(form.newPassword);
    setStep(2);
    //}
  };

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
