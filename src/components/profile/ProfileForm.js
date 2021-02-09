import React, { Fragment, useState, useEffect } from 'react'

export const ProfileForm = ({ logout, profileData, profileChange }) => {
  const [form, setForm] = useState({
    userName: profileData.userName,
    email: profileData.email,
    telegram: profileData.telegram,
  })

  useEffect(() => {
    // Выглядит не очень оптимально, но я пока не знаю как сделать
    // лучше ( если это вообще возможно)
    const onKeypress = event => {
      if (event.code === 'Enter') {
        profileChange({ ...form })
      }
    }
    document.addEventListener('keyup', onKeypress)

    return () => {
      document.removeEventListener('keyup', onKeypress)
    }
  }, [form, profileChange])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  return (
    <Fragment>
      <div>
        <form onSubmit={event => event.preventDefault()}>
          <div>
            <span>Имя</span>
            <input
              type="text"
              id="userName"
              name="userName"
              value={form.userName}
              onChange={changeHandler}
            />
          </div>
          <div>
            <span>Почта</span>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
          <div>
            <span>Телеграмм</span>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={form.telegram}
              onChange={changeHandler}
            />
          </div>
          <div>
            <input value="Сменить пароль" type="submit" />
            <button onClick={logout}>Выйти</button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
