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

// model Product {
//     id          Int      @id @default(autoincrement())
//     name        String
//     description String   @db.Text
//     price       Decimal
//     category    Int
//     status      Status   @default(AVAILABLE)
//     userId      Int
//     user        User     @relation(fields: [userId], references: [id])
//     createdAt   DateTime @default(now())
//     updatedAt   DateTime @updatedAt

//     @@map("products")
//   }

//   model Category {
//     id        Int      @id @default(autoincrement())
//     name      String
//     createdAt DateTime @default(now())
