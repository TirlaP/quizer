import React, { useEffect, useState } from "react";
import { ColloredCircles } from "../../common/components/collored-circles/collored-circles";

import rocket from "../../common/assets/rocket.png";
import logo from "../../common/assets/Logo-red.png";
import "./landing-page.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { LoginStore } from "../../features/authentication/login/store/LoginStore";

export const LandingPage: React.FC = observer(() => {
  const navigate = useNavigate();

  return (
    <div className="landing-page card--center align-items-center">
      <div className="landing-page__container">
        <img src={logo} alt="logo" className="logo" />
        <div className="landing-page__content">
          <h1 className="landing-page__title text-left">
            Create your quiz today
          </h1>
          <p className="landing-page__subtitle text-left">
            Create a quiz that engages students, generates leads or promotes
            your brand.
          </p>
          <Button
            label="Start now"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="landing-page__button"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
      <div className="landing-page__image-container">
        <img src={rocket} alt="sally rocket" className="landing-page__photo" />
      </div>
      <ColloredCircles />
    </div>
  );
});
