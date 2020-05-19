import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email("Email must be valid, example: john@mail.com"),
  password: yup
    .string()
    .min(8, "Password must containt at least 8 charachters"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Does not match with password")
    .required("Required"),
});
