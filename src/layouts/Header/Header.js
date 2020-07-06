import React from "react";

import "./Header.scss";

import logo from "img/logo.png";

const Header = () => {
  return (
    <header className="main-header">
      <img src={logo} alt="" className="main-header__logo" />
      <h1 className="main-header__title">Explore the world of Wordpress</h1>
      <h3 className="main-header__sub-title">
        search through plethora of posts right now
      </h3>
    </header>
  );
};

export default Header;
