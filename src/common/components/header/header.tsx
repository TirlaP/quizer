import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";
import logo from "../../../common/assets/Logo-red.png";

const navItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
  },
  {
    id: 2,
    title: "Profile",
    path: "/profile",
  },
  {
    id: 3,
    title: "Logout",
    path: "/login",
  },
];
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <nav className="navbar">
        <div className="flex navbar__wrapper">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar__items">
            {navItems.map((item) => {
              return (
                <li key={item.id} className="navbar__item">
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
