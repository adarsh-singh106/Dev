// lib/schemas.js
import * as z from "zod";

export const friendSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  birthday: z.string().min(1, "Birthday is required"),
  status: z.enum(["Single", "Married", "In a Relationship"]),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  nickname: z.string().optional(),
});