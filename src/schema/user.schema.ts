import { object, string, TypeOf } from "zod";

const signUpUserSchema = object({
  body: object({
    name: string({
      required_error: "please enter a name",
    }).min(5, "name must be at least 5 characters"),
    email: string({
      required_error: "Please enter your email",
    }).email("invalid email format"),
    password: string({
      required_error: "Please enter your password",
    }).min(5, "password must be more than 5 characters"),
    confirmPassword: string({
      required_error: "please enter your new password",
    }).min(5, "confirm password must be more than 5 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of the error field
  }),
});

const signInUserSchema = object({
  body: object({
    email: string().email("invalid email format"),
    password: string().min(5, "password must be more than 5 characters"),
  }),
});

export type SignUpUserInput = TypeOf<typeof signUpUserSchema>;
export type SignInUserInput = TypeOf<typeof signInUserSchema>;

export {signUpUserSchema, signInUserSchema}
