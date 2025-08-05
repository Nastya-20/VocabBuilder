import * as yup from 'yup';

// Схема для реєстрації 
export const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
      .required("Email is required"),
    password: yup
      .string()
      .matches(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/, "Password must be at least 6 letters and include a digit")
      .required("Password is required"),
});
  
// Схема для логіну 
export const loginSchema = yup.object().shape({
  email: yup
  .string()
  .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "Invalid email")
  .required("Email is required"),
password: yup
  .string()
  .matches(/^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7,}$/, "Password must be at least 6 letters and include a digit")
  .required("Password is required"),
});