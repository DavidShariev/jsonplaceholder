import React from 'react'
import {NavLink} from "react-router-dom";
import { useAppDispatch } from '../../redux/hooks';
import { changeMode } from '../../redux/slices/visibilitySlice';
import "./Header.scss";

const Header = () => {
  const dispatch = useAppDispatch();
  const changeVisibilityMode = () => {
    dispatch(changeMode());
  }

  return (
    <div className="header">
      <div className="container">
        <NavLink className="header__logo" to="/">
          <h2>concert club</h2>
        </NavLink>
        <div className="header__btns">
          <button onClick={changeVisibilityMode} className="header__btns-eyeless">Версия для слабовидящих</button>
          <NavLink className="header__btns-profile" to="/profile/1">
            <button>Мои профиль</button>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header