-- CreateTable
CREATE TABLE "profile_images" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "imageName" CHAR(32) NOT NULL,
    "imageLink" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_images_userId_key" ON "profile_images"("userId");

-- AddForeignKey
ALTER TABLE "profile_images" ADD CONSTRAINT "profile_images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
