import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";

import "./header.scss";
import logo from "../../../common/assets/Logo-red.png";
import { Button } from "primereact/button";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("authenticated") || "false");

    setIsAuthenticated(isAuth);
  }, []);

  const logout = async () => {
    await signOut(auth);
    localStorage.setItem("authenticated", JSON.stringify(false));
    localStorage.removeItem("user");
  };

  return (
    <>
      <nav className="navbar">
        <div className="flex navbar__wrapper">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="" />
          </Link>
          <ul className="navbar__items">
            <li className="navbar__item">
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            {user.isAdmin && (
              <>
                <li className="navbar__item">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="navbar__item">
                  <Button label="Create Quiz" className="navbar__button-quiz" />
                </li>
              </>
            )}
            <li
              className="navbar__item"
              onClick={
                isAuthenticated
                  ? logout
                  : () => {
                      navigate("/login");
                    }
              }
            >
              <Link to="/login">
                {isAuthenticated ? (
                  <div className="flex align-items-center gap-2">
                    <span>{user.isAdmin ? "Admin" : "User"}</span>
                    <i className="pi pi-sign-out"></i>
                  </div>
                ) : (
                  <div>
                    <span>Login</span>
                  </div>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
