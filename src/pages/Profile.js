import React, { Fragment, useContext } from 'react'
import { AuthContext } from '../context/auth/AuthContext'

export const Profile = () => {
  const { logout } = useContext(AuthContext)

  return (
    <Fragment>
      <div>
        <form>
          <div>
            <span>Имя</span>
            <input placeholder="Cezar" type="text" />
          </div>
          <div>
            <span>Почта</span>
            <input placeholder="wannakillms@gmail.com" type="email" />
          </div>
          <div>
            <span>Телеграмм</span>
            <input placeholder="@DieYouWatchCo" type="text" />
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
