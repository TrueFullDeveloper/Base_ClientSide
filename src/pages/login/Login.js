import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../reduxToolkit/SliceWithAPI/authSlice";

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
    <form>
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
      <button type="button" onClick={onClick}>
        Войти
      </button>

      <Link to="/passwordrecovery">Забыли пароль?</Link>
      <Link to="/signin">Регистрация</Link>
    </form>
  );
};
