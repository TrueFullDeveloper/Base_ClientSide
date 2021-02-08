import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth/AuthContext'

export const Signup = () => {
  const { fetchSignup } = useContext(AuthContext)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordRep: '',
  })

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onClick = () => {
    if (form.password > 6 && form.password === form.passwordRep) {
      fetchSignup(form.name, form.email, form.password)
    } else {
      setForm({ ...form, password: '', passwordRep: '' })
      alert('Пароль не совпадает')
    }
  }

  return (
    <form>
      <h1>РЕГИСТРАЦИЯ</h1>
      <input
        placeholder="Имя"
        type="text"
        id="name"
        name="name"
        value={form.name}
        onChange={changeHandler}
      />
      <input
        placeholder="Почта"
        type="email"
        id="email"
        name="email"
        value={form.email}
        onChange={changeHandler}
      />
      <input
        placeholder="Пароль"
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={changeHandler}
      />
      <input
        placeholder="Повторите пароль"
        type="password"
        id="passwordRep"
        name="passwordRep"
        value={form.passwordRep}
        onChange={changeHandler}
      />
      <button type="button" onClick={onClick}>
        Зарегистрироваться
      </button>
      <Link to="/login">Войти</Link>
    </form>
  )
}
