import * as yup from "yup";

export interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

export const signUpFormDefaultValues: SignUpForm = {
  name: "",
  email: "",
  password: "",
};

type SignUpSchema = yup.ObjectSchema<SignUpForm>;

export const signUpValidationSchema: SignUpSchema = yup.object({
  name: yup.string().required("The name is required"),
  email: yup.string().email("Invalid email").required("The email is required"),
  password: yup
    .string()
    .required("The password is required")
    .min(8, "The password must be at least 8 characters long"),
});
