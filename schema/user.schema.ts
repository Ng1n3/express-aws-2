import { object, z } from "zod";

const signUpUserSchema = object({
  body: object({
    name: z.string().min(5, "name must be at least 5 characters"),
    email: z.string().email("invalid email format"),
    password: z.string().min(5, "password must be more than 5 characters"),
    confirmPassword: z
      .string()
      .min(5, "confirm password must be more than 5 characters"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of the error field
  }),
});

const signInUserSchema = object({
  body: object({
    email: z.string().email("invalid email format"),
    password: z.string().min(5, "password must be more than 5 characters"),
  }),
});

export type SignUpUserSchema = z.infer<typeof signUpUserSchema>;
export type SignInUserSchema = z.infer<typeof signInUserSchema>;
