import * as yup from "yup";

export interface SignInForm {
  email: string;
  password: string;
}

export const signInFormDefaultValues: SignInForm = {
  email: "",
  password: "",
};

type SignInSchema = yup.ObjectSchema<SignInForm>;

export const signInValidationSchema: SignInSchema = yup.object({
  email: yup.string().email("Invalid email").required("The email is required"),
  password: yup.string().required("The password is required"),
});
