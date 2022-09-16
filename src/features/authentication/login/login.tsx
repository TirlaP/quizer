import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";

import logo from "../../../common/assets/Logo.png";
import "./login.scss";
import "../../../styles/buttons.scss";
import { auth } from "../../../config/firebase-config";
import { LoginStore } from "./store/LoginStore";
import { observer } from "mobx-react-lite";

export const LoginForm: React.FC = observer(() => {
  const navigate = useNavigate();
  const { isAuthenticated } = LoginStore.login;

  const [checked, setChecked] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmitPress, setIsSubmitPress] = useState(false);

  const loginToApp = async () => {
    const errors = initialValues;
    try {
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );

      navigate("/homepage");
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("user-not-found")) {
        errors.email = "Email is incorrect.";
        setFormErrors(errors);
      } else if (error.message.includes("password")) {
        errors.password = "Password is incorrect.";
        setFormErrors(errors);
      }
    }
  };

  const signInWithMedia = async (mediaProvider: any) => {
    const provider = new mediaProvider();
    try {
      const user = await signInWithPopup(auth, provider);
      LoginStore.loginSucces(user);
      navigate("/homepage");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(getErrors(formValues));
    setIsSubmitPress(true);
  };

  const getErrors = (values: any) => {
    const validationErrors = initialValues;

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!values.email) {
      validationErrors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      validationErrors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      validationErrors.password = "Password is required.";
    } else if (values.password.length < 8) {
      validationErrors.password = "Password must be more than 8 characters.";
    }
    return validationErrors;
  };

  useEffect(() => {
    // validating form errors to see if we can loggin to app
    if (
      !formErrors.email.length &&
      !formErrors.password.length &&
      isSubmitPress
    ) {
      loginToApp();
    }
  }, [formErrors, isSubmitPress]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/homepage");
    }
  }, [isAuthenticated]);

  return (
    <div className="login">
      <div className=" align-items-center justify-content-center card--center">
        <div className="login__card">
          <div className="text-center mb-2">
            <img src={logo} alt="hyper" height={50} className="login__logo" />
          </div>

          <div className="align-items-center">
            <form onSubmit={handleSubmit} className="button">
              <div className="flex flex-column align-items-start p-input-icon-right">
                <label
                  htmlFor="email"
                  className="block align-self-start text-900 font-medium mb-2 relative"
                >
                  Username or Email
                </label>

                {formErrors.email && (
                  <i className="pi pi-exclamation-triangle form__icon--exlamation" />
                )}

                <InputText
                  name="email"
                  id="email"
                  type="text"
                  className={`login__input ${
                    formErrors.email ? "p-invalid" : ""
                  }`}
                  placeholder="Enter your username"
                  value={formValues.email}
                  onChange={handleChange}
                  validateOnly={true}
                />
                <small id="email-help" className="p-error">
                  {formErrors.email}
                </small>
              </div>

              <div className="flex flex-column mt-3 align-items-start p-input-icon-right">
                <label
                  htmlFor="password"
                  className="block align-self-start text-900 font-medium mb-2 relative"
                >
                  Password
                </label>

                {formErrors.password && (
                  <i className="pi pi-exclamation-triangle form__icon--exlamation" />
                )}

                <InputText
                  name="password"
                  id="password"
                  type="password"
                  className={`login__input ${
                    formErrors.password ? "p-invalid" : ""
                  }`}
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <small id="password-help" className="p-error">
                  {formErrors.password}
                </small>
              </div>

              <div className="flex align-items-center justify-content-between mt-3 login__remember-section">
                <div className="flex align-items-center">
                  <Checkbox
                    id="rememberme"
                    onChange={(e) => setChecked(e.checked)}
                    checked={checked}
                    className="mr-2"
                  />
                  <label htmlFor="rememberme" className="login__remember-text">
                    Remember me
                  </label>
                </div>
                <span
                  className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot your password?
                </span>
              </div>

              <Button
                label="Log In"
                className="button__common-style button__login-login"
              />
            </form>
            <div className="login__divider">
              <div className="login__or-wrapper">OR</div>
            </div>

            <div className=" mt-3 media__wrapper__column">
              <div className="media__wrapper__row button">
                <Button
                  label="Google"
                  icon="pi pi-google"
                  className="button__common-style button__login-media google"
                  onClick={() => signInWithMedia(GoogleAuthProvider)}
                />
                <Button
                  label="Facebook"
                  icon="pi pi-facebook"
                  className="button__common-style button__login-media"
                  onClick={() => signInWithMedia(FacebookAuthProvider)}
                />
              </div>
              <p>
                Do not have an account?{" "}
                <span
                  className="login__span-register"
                  onClick={() => navigate("/register")}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
