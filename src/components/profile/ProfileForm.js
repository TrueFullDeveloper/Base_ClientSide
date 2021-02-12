import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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

  const onChange = event => {
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
              onChange={onChange}
            />
          </div>
          <div>
            <span>Почта</span>
            <input type="email" id="email" name="email" value={form.email} onChange={onChange} />
          </div>
          <div>
            <span>Телеграмм</span>
            <input
              type="text"
              id="telegram"
              name="telegram"
              value={form.telegram}
              onChange={onChange}
            />
          </div>
          <div>
            <button type="button">
              <Link to="/passworchange">Сменить пароль</Link>
            </button>
            <button onClick={logout}>Выйти</button>
          </div>
        </form>
      </div>
    </Fragment>
  )
}
