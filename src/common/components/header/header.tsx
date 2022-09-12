import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";
import logo from "../../../common/assets/Logo-red.png";

const navItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
    nName: "navbar--item",
    sName: "sidebar--item",
  },
  {
    id: 2,
    title: "Profile",
    path: "/profile",
    nName: "navbar--item",
    sName: "sidebar--item",
  },
  {
    id: 3,
    title: "Logout",
    path: "/login",
    nName: "navbar--item",
    sName: "sidebar--item",
  },
];
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <>
      <nav className="navbar">
        <div className="flex navbar--wrapper">
          <Link to="/" className="navbar--logo">
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar--items">
            {navItems.map((item) => {
              return (
                <li key={item.id} className={item.nName}>
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
