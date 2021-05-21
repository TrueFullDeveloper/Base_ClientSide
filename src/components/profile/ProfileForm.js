import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  profileUpdate,
  selectProfile,
} from "../../reduxToolkit/SliceWithAPI/profileSlice";
import { userLogout } from "../../reduxToolkit/SliceWithAPI/authSlice";

export const ProfileForm = () => {
  const profileData = useSelector(selectProfile);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    userName: profileData.userName,
    email: profileData.email,
    telegram: profileData.telegram,
  });

  useEffect(() => {
    const onKeypress = event => {
      if (event.code === "Enter") {
        dispatch(profileUpdate({ ...form }));
      }
    };
    document.addEventListener("keyup", onKeypress);

    return () => {
      document.removeEventListener("keyup", onKeypress);
    };
  }, [form, dispatch]);

  const onChange = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

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
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={onChange}
            />
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
            <button onClick={() => dispatch(userLogout())}>Выйти</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
