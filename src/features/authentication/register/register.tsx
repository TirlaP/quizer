import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import logo from "../../../common/assets/Logo.png";
import "./register.scss";

import { auth } from "../../../config/firebase-config";
import { observer } from "mobx-react-lite";

interface RegisterFormProps {}

interface UserData {}

export const RegisterForm: React.FC<RegisterFormProps> = observer(() => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);

  const initialValues = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [isSubmit, setIsSubmit] = useState(false);

  const register = async () => {
    const errors = initialValues;
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      navigate("/homepage");
    } catch (error: any) {
      if (error.message.includes("email-already-in-use")) {
        errors.email = "Email already in use.";
        setFormErrors(errors);
      }
      console.log(error.message);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values: any) => {
    const errors = initialValues;

    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    return errors;
  };

  useEffect(() => {
    // validating form errors to see if we can loggin to app
    if (!formErrors.email.length && !formErrors.password.length && isSubmit) {
      register();
    }
  }, [formErrors]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="register">
      <div className=" align-items-center justify-content-center card--center">
        <div className="register__card">
          <div className="text-center mb-2">
            <img src={logo} alt="hyper" height={50} className="logo" />
          </div>

          <div className="align-items-center">
            <form onSubmit={handleSubmit}>
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
                  name="email"
                  id="email"
                  type="text"
                  className={`register__input ${
                    formErrors.email ? "p-invalid" : ""
                  }`}
                  placeholder="Enter your username"
                  value={formValues.email}
                  onChange={handleChange}
                />
                <small id="email-help" className="p-error">
                  {formErrors.email}
                </small>
              </div>

              <div className="flex flex-column align-items-start mt-3 p-input-icon-right">
                <label
                  htmlFor="password"
                  className="block align-self-start text-900 font-medium mb-2 relative"
                >
                  Password
                </label>

                {formErrors.password && (
                  <i className="pi pi-exclamation-triangle form__icon--exclamation" />
                )}

                <InputText
                  name="password"
                  id="password"
                  type="password"
                  className={`register__input ${
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

              <Button label="Register" className="register__button-register" />
            </form>

            <div className="register__divider">
              <div className="register__or-wrapper">OR</div>
            </div>

            <div className="flex flex-column mt-3 media__wrapper__column">
              <div className="media__wrapper__row">
                <Button
                  label="Google"
                  icon="pi pi-google"
                  className="register__button-media"
                  onClick={register}
                />
                <Button
                  label="Facebook"
                  icon="pi pi-facebook"
                  className="register__button-media"
                />
              </div>
              <p>
                Already have an account?{" "}
                <span
                  className="register__span-signin"
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
