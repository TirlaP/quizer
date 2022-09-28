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

export const isFormFieldValid = (name: any, formik: any) => {
  if (name.toLowerCase().includes("answer".toLocaleLowerCase())) {
    return !!formik.errors[name];
  } else {
    return !!(formik.errors[name] && formik.touched[name]);
  }
};

/**
 * TOAST SERVICE
 */

export const showSuccess = (message: string, toast: any) => {
  if (toast) {
    toast.current?.show({
      severity: "success",
      summary: "Success Message",
      detail: `${message}`,
      life: 3000,
    });
  }
};

export const showError = (message: string, toast: any) => {
  toast.current?.show({
    severity: "error",
    summary: "Error Message",
    detail: `${message}`,
    life: 3000,
  });
};

export const convertTimeStampToDate = (timeStamp: number) => {
  let date = new Date(timeStamp * 1000);
  return date.toLocaleDateString();
};
