import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth/AuthContext';

export const Login = () => {
  const { fetchLogin } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    fetchLogin({ email: form.email, password: form.password });
  };

  return (
    <form>
      <h1>Авторизация</h1>
      <input
        placeholder='Почта'
        type='email'
        id='email'
        name='email'
        value={form.email}
        onChange={onChange}
      />
      <input
        placeholder='Пароль'
        type='password'
        id='password'
        name='password'
        value={form.password}
        onChange={onChange}
      />
      <button type='button' onClick={onClick}>
        Войти
      </button>

      <Link to='/passwordrecovery'>Забыли пароль?</Link>
      <Link to='/signin'>Регистрация</Link>
    </form>
  );
};
