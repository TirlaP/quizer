import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import logo from "../../../common/assets/Logo.png";
import "./forgotPassword.scss";

import { observer } from "mobx-react-lite";
import { auth } from "../../../config/firebase-config";

export const ForgotPasswordForm: React.FC = observer(() => {
  const navigate = useNavigate();

  const [isSubmitPress, setIsSubmitPress] = useState(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const [formErrors, setFormErrors] = useState(initialValues);
  const [email, setEmail] = useState("");

  const forgotPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const validate = (value: any) => {
    const errors = initialValues;

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!value) {
      errors.email = "Email is required.";
    } else if (!regex.test(value)) {
      errors.email = "This is not a valid email format!";
    }
    return errors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(email));
    setIsSubmitPress(true);
  };

  useEffect(() => {
    const errors = initialValues;
    // validating form errors to see if we can loggin to app
    if (!formErrors.email.length && isSubmitPress) {
      forgotPassword(email)
        .then(() => {
          console.log("Forgot password success");
          setSuccessfulSubmit(true);
        })
        .catch((error) => {
          console.log(error.message);
          if (error.message.includes("user-not-found")) {
            errors.email = "Email is incorrect.";
            setFormErrors(errors);
          }
          setSuccessfulSubmit(false);
        });
    }
  }, [formErrors]);

  return (
    <div className="forgot__password">
      <div className=" align-items-center justify-content-center card--center">
        <div className="forgot__card">
          <div className="text-center mb-2">
            <img src={logo} alt="hyper" height={50} className="logo" />
          </div>
          {!successfulSubmit && (
            <div className="align-items-center">
              <div className="flex flex-column align-items-start p-input-icon-right">
                <label
                  htmlFor="email"
                  className="block align-self-start text-900 font-medium mb-2 relative"
                >
                  Username or Email
                </label>

                {formErrors.email && (
                  <i className="pi pi-exclamation-triangle form__icon--exclamation" />
                )}

                <InputText
                  id="email"
                  type="text"
                  className={`forgot__input ${
                    formErrors.email ? "p-invalid" : ""
                  }`}
                  placeholder="Email or Username"
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="email-help" className="p-error">
                  {formErrors.email}
                </small>
              </div>

              <Button
                label="Send Reset Link"
                className="forgot__button-reset google mt-3"
                onClick={handleSubmit}
              />
              <div className="forgot__divider">
                <div className="forgot__or-wrapper">OR</div>
              </div>

              <div className="flex flex-column mt-3">
                <p>
                  Back to{" "}
                  <span
                    className="forgot__span-login"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          )}
          {successfulSubmit && (
            <div>
              <div className="text-center mb-2 forgot--check--icon">
                <i className="pi pi-check-circle"></i>
              </div>
              <div className="forgot__message--success">
                <h2>Forgot Password</h2>
                <p>
                  If provided email is a registered email ID on Quizer, you will
                  receive an email with further instructions on how to reset
                  your password. In case you didn't receive this email, you need
                  to create a new account{" "}
                  <span
                    className="forgot__span-login"
                    onClick={() => navigate("/register")}
                  >
                    here
                  </span>
                  .
                </p>
              </div>
              <Button
                label="Log In"
                className="forgot__button-reset mt-3"
                onClick={() => navigate("/login")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
