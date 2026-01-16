// lib/schemas.js
import * as z from "zod";

export const friendSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  birthday: z.string().min(1, "Birthday is required"),
  status: z.enum(["Single", "Married", "In a Relationship"]),
  mobile: z.string().min(1,"Mobile number is required")
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
  ,
  nickname: z.string().optional(),
});