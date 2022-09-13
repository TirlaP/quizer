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

  // Validate the input fields and check for any errors.
  // If found, update the local object with the errors found.
  // Return it to be used for a better user experience.
  const getErrors = (value: any) => {
    const validationErrors = initialValues;
    console.log(validationErrors);

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!value) {
      validationErrors.email = "Email is required.";
    } else if (!regex.test(value)) {
      validationErrors.email = "This is not a valid email format!";
    }
    console.log(validationErrors === initialValues);
    return validationErrors;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(getErrors(email));
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
  }, [formErrors, isSubmitPress]);

  return (
    <div className="forgot-password">
      <div className=" align-items-center justify-content-center card--center">
        <div className="forgot-password__card">
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
                  className={`forgot-password__input ${
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
                className="forgot-password__button-reset mt-3"
                onClick={handleSubmit}
              />
              <div className="forgot-password__divider">
                <div className="forgot-password__or-wrapper">OR</div>
              </div>

              <div className="flex flex-column mt-3">
                <p>
                  Back to{" "}
                  <span
                    className="forgot-password__span-login"
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
              <div className="text-center mb-2 forgot-password__check-icon">
                <i className="pi pi-check-circle"></i>
              </div>
              <div className="forgot-password__message--success">
                <h2>Forgot Password</h2>
                <p>
                  If provided email is a registered email ID on Quizer, you will
                  receive an email with further instructions on how to reset
                  your password. In case you didn't receive this email, you need
                  to create a new account{" "}
                  <span
                    className="forgot-password__span-login"
                    onClick={() => navigate("/register")}
                  >
                    here
                  </span>
                  .
                </p>
              </div>
              <Button
                label="Log In"
                className="forgot-password__button-reset mt-3"
                onClick={() => navigate("/login")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
