import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header: FunctionComponent = () => {
  return (
    <div className="main-container">
      <nav className="nav-container">
        <ul className="ul-container">
          <li>
            <h3 className="title-container">Sport Arena</h3>
          </li>
          <li>
            <Link className="link-container one" to="/schedule">
              Your Sports
            </Link>
          </li>
          <li>
            <Link className="link-container" to="/logout">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
