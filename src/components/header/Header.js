import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/'>Главная</NavLink>
        </li>
        <li>
          <NavLink to='/topqueries'>Топ запросов</NavLink>
        </li>
        <li>
          <NavLink to='/history'>История</NavLink>
        </li>
        <li>
          <NavLink to='/profile'>Профиль</NavLink>
        </li>
      </ul>
    </nav>
  );
};
