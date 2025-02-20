/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/Header.css"; 

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">Portfolio</h1>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
