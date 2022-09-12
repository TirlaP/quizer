import React, { useState } from "react";
import "./login.scss";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import logo from "../../../common/assets/Logo.png";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="login">
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
                placeholder="Enter your username"
              />
            </div>

            <div className="flex flex-column mt-3">
              <label
                htmlFor="password"
                className="block align-self-start text-900 font-medium mb-2 relative"
              >
                Password
              </label>
              <InputText
                id="password"
                type="password"
                className="input"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex align-items-center justify-content-between mt-3 div__remember">
              <div className="flex align-items-center">
                <Checkbox
                  id="rememberme"
                  onChange={(e) => setChecked(e.checked)}
                  checked={checked}
                  className="mr-2"
                />
                <label htmlFor="rememberme" className="rememberText">
                  Remember me
                </label>
              </div>
              <a
                className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                href="/"
              >
                Forgot your password?
              </a>
            </div>

            <Button label="Log In" className="buttonLogin" />
            <div className="divider">
              <div className="or_wrapper">OR</div>
            </div>

            <div className="flex flex-column mt-3 media__wrapper">
              <div>
                <Button
                  label="Log In using Google"
                  icon="pi pi-google"
                  className="buttonMedia"
                />
              </div>
              <Button
                label="Log In using Facebook"
                icon="pi pi-facebook"
                className="buttonMedia"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
