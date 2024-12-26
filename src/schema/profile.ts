import { z } from "zod";

export const ReviewSchema = z.object({
  rating: z
    .number()
    .int()
    .min(1)
    .max(5)
    .describe("Rating must be between 1 and 5"),
  description: z
    .string()
    .min(1)
    .max(1000)
    .describe("Review description is required"),
});
