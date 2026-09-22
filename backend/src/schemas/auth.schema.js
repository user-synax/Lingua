import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name at least 2 chars").max(80),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(8, "At least 8 characters").max(128),
    ageConfirmed: z.boolean().refine((v) => v === true, "You must confirm you are 18+"),
    agree: z.boolean().refine((v) => v === true, "You must accept Terms"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

export const verifySchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
    code: z.string().regex(/^\d{6}$/, "6-digit code required"),
  }),
});

export const forgotSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
  }),
});

export const resetSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
    code: z.string().regex(/^\d{6}$/, "6-digit code required"),
    newPassword: z.string().min(8, "At least 8 characters").max(128),
  }),
});

export const refreshSchema = z.object({});
