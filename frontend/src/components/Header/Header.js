import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./header.css";

function Header({ signOut }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="логотип" className="header__logo" />
      </Link>

      <Route exact path="/">
        <div className="header__info">
          <p className="header__info__mail">kk@kk.ee</p>
          <Link to="/sign-in" className="header__out" onClick={signOut}>
            Выйти
          </Link>
        </div>
      </Route>
      <Route path="/login">
        <div className="header__sign-block">
          <Link to="/register" className="header__sign">
            Register
          </Link>
        </div>
      </Route>
      <Route path="/register">
        <div className="header__sign-block">
          <Link to="/login" className="header__sign">
            Login
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
