import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, {
        message: "Name must be at least 3 characters.",
      })
      .max(50, {
        message: "Name must be at most 50 characters.",
      })
      .regex(/^[A-Za-z]+( [A-Za-z]+)*$/, {
        message: "Name can only contain alphabets.",
      }),
    email: z.string().trim().email("Please enter a valid email address."),
    password: z
      .string()
      .trim()
      .min(6, {
        message: "Password must be at least 6 characters.",
      })
      .max(16, {
        message: "Password must be at most 16 characters.",
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match.",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z
    .string()
    .trim()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(16, {
      message: "Password must be at most 16 characters.",
    }),
});

export const CreateNoteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, {
      message: "Title must be at least 3 characters.",
    })
    .max(50, {
      message: "Title must be at most 50 characters.",
    }),
  description: z.string().trim().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  tags: z.array(z.string()),
});
