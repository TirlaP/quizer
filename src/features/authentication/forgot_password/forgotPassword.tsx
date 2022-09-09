import React, { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import logo from "../../../common/assets/Logo.png";
import "./forgotPassword.scss";

import { observer } from "mobx-react-lite";
import { ColloredCircles } from "../../../common/components/collored-circles/collored-circles";

export const ForgotPasswordForm: React.FC = observer(() => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  return (
    <div className="forgot__password">
      <div className=" align-items-center justify-content-center card-center">
        <div className="card">
          <div className="text-center mb-2">
            <img src={logo} alt="hyper" height={50} className="logo" />
          </div>

          <div className="align-items-center">
            <div className="flex flex-column align-items-center">
              <label
                htmlFor="email"
                className="block align-self-start text-900 font-medium mb-2 relative"
              >
                Username or Email
              </label>
              <InputText
                id="email"
                type="text"
                className="input"
                placeholder="Email or Username"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button
              label="Send Reset Link"
              className="buttonReset google mt-3"
            />
            <div className="divider">
              <div className="or_wrapper">OR</div>
            </div>

            <div className="flex flex-column mt-3">
              <p>
                Back to{" "}
                <span
                  className="span__login"
                  onClick={() => navigate("/login")}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
