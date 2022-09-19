import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";

import "./header.scss";
import "../../../styles/buttons.scss";

import logo from "../../../common/assets/Logo-red.png";
import { Button } from "primereact/button";

import { LoginStore } from "../../../features/authentication/login/store/LoginStore";
import { observer } from "mobx-react-lite";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = observer(() => {
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const { isAuthenticated, user } = LoginStore.login;

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
    LoginStore.logout();
  };

  const sidebarToggle = () => {
    setSidebar(!sidebar);
  };

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMobile(true);
      } else {
        setSidebar(false);
        setMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="flex navbar__wrapper">
          <Link to="/" className="navbar__logo">
            <img src={logo} alt="" />
          </Link>
          {!mobile && (
            <ul className="menu__items navbar__items">
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
                  <li className="navbar__item button">
                    <Button
                      label="Create Quiz"
                      className="button__common-style button__navbar-create"
                      onClick={() => navigate("/create-quiz")}
                    />
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
          )}

          {mobile && (
            <div className="navbar__sidebar--toggle">
              {sidebar ? (
                <i
                  className="pi pi-times navbar__sidebar-icon"
                  onClick={sidebarToggle}
                />
              ) : (
                <i
                  className="pi pi-bars navbar__sidebar-icon"
                  onClick={sidebarToggle}
                />
              )}
            </div>
          )}
        </div>
      </nav>

      <div className={sidebar ? "sidebar sidebar--active" : "sidebar"}>
        {mobile && (
          <ul className="menu__items sidebar__items">
            <li className="sidebar__item">
              <Link to="/">
                <span>Home</span>
              </Link>
            </li>
            {user.isAdmin && (
              <>
                <li className="sidebar__item">
                  <Link to="/dashboard">
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="sidebar__item button">
                  <Button
                    label="Create Quiz"
                    className="button__common-style button__navbar-create"
                    onClick={() => navigate("/create-quiz")}
                  />
                </li>
              </>
            )}
            <li
              className="sidebar__item"
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
        )}
      </div>
    </>
  );
});
