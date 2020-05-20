import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup
    .string()
    .email("Email must be valid, example: john@mail.com")
    .required(),
  password: yup
    .string()
    .min(8, "Password must containt at least 8 charachters")
    .required(),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Does not match with password")
    .required("Required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be valid, example: john@mail.com")
    .required(),
  password: yup
    .string()
    .min(8, "Password must containt at least 8 charachters")
    .required(),
});

export const createTeamSchema = yup.object().shape({
  name: yup
    .string()
    .trim("The team name cannot include leading and trailing spaces")
    .strict(true)
    .required("The team name is required field"),
});
