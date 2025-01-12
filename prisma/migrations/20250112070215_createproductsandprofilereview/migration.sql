/*
  Warnings:

  - You are about to drop the column `imageName` on the `profile_images` table. All the data in the column will be lost.
  - Added the required column `imageId` to the `profile_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile_images" DROP COLUMN "imageName",
ADD COLUMN     "imageId" TEXT NOT NULL;
