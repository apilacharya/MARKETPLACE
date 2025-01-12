/*
  Warnings:

  - You are about to drop the column `imageLink` on the `profile_images` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile_images" DROP COLUMN "imageLink",
ALTER COLUMN "imageName" SET DATA TYPE TEXT;
