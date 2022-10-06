import { Button } from "primereact/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginStore } from "../../../../features/authentication/login/store/LoginStore";

interface NavbarReusableProps {
  mobile: any;
  sidebar: any;
  logout: any;
}

export const NavbarReusable: React.FC<NavbarReusableProps> = ({
  mobile,
  sidebar,
  logout,
}) => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = LoginStore.login;

  return (
    <ul
      className={`menu__items ${sidebar ? "sidebar__items" : "navbar__items"}`}
    >
      <li className={`${sidebar ? "sidebar__item" : "navbar__item"}`}>
        <Link to="/homepage">
          <span>Home</span>
        </Link>
      </li>
      {user.isAdmin && (
        <>
          <li className={`${sidebar ? "sidebar__item" : "navbar__item"}`}>
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </li>
          <li
            className={`${sidebar ? "sidebar__item" : "navbar__item"} button`}
          >
            <Button
              label="Create Quiz"
              className="button__common-style button__navbar-create"
              onClick={() => navigate("/create-quiz")}
            />
          </li>
        </>
      )}
      <li
        className={`${sidebar ? "sidebar__item" : "navbar__item"}`}
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
  );
};
