import { z } from "zod";

enum Status {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
}

export const ProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.number().int(),
  status: z.nativeEnum(Status).default(Status.AVAILABLE),
});

export const CategorySchema = z.object({
  name: z.string(),
});

