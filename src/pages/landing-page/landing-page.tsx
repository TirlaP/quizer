import React from "react";
import { ColloredCircles } from "../../common/components/collored-circles/collored-circles";

import rocket from "../../common/assets/rocket.png";
import logo from "../../common/assets/Logo-red.png";
import "./landing-page.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing--page card--center align-items-center">
      <div className="landing--container">
        <img src={logo} alt="logo" className="logo" />
        <div className="landing--content">
          <h1 className="landing--title text-left">Create your quiz today</h1>
          <p className="landing--subtitle text-left">
            Create a quiz that engages students, generates leads or promotes
            your brand.
          </p>
          <Button
            label="Start now"
            icon="pi pi-arrow-right"
            iconPos="right"
            className="landing--button"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
      <div className="landing--image--container">
        <img src={rocket} alt="sally rocket" className="landing--photo" />
      </div>
      <ColloredCircles />
    </div>
  );
};
