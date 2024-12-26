/*
  Warnings:

  - You are about to drop the column `content` on the `product_comments` table. All the data in the column will be lost.
  - Added the required column `description` to the `product_comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_comments" DROP COLUMN "content",
ADD COLUMN     "description" TEXT NOT NULL;
