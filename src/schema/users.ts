import { z } from "zod";

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const SignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});
