import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";

import "./header.scss";
import "../../../styles/buttons.scss";
import { RESOLUTION_BREAKPOINTS } from "../../constants/constant";

import logo from "../../../common/assets/Logo-red.png";

import { LoginStore } from "../../../features/authentication/login/store/LoginStore";
import { observer } from "mobx-react-lite";
import { NavbarReusable } from "./components/navbar-reusable";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = observer(() => {
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

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
    if (window.innerWidth < RESOLUTION_BREAKPOINTS.LAPTOP) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < RESOLUTION_BREAKPOINTS.LAPTOP) {
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
            <NavbarReusable mobile={mobile} sidebar={sidebar} logout={logout} />
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
          <NavbarReusable mobile={mobile} sidebar={sidebar} logout={logout} />
        )}
      </div>
    </>
  );
});
