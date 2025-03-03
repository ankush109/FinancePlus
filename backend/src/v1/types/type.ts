import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  age: z.number().min(0, "Age must be at least 0").max(120, "Age cannot exceed 120"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one digit"),
  gender: z.enum(["Male", "Female", "Other"]),
  about: z.string().max(5000, "About section cannot exceed 5000 characters"),
  email: z.string().email("Invalid email format"),
});
export const loginSchema = z.object({
 
  email: z.string().email("Invalid email format"),
  password:z.string()
});

