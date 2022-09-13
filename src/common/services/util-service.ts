import { nanoid } from "nanoid";

const initialValues = {
  email: "",
  password: "",
};

export const getErrors = (values: any) => {
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
  } else if (values.password.length >= 8) {
    validationErrors.password = "";
  }
  return validationErrors;
};
