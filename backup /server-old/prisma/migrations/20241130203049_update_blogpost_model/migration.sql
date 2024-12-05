/*
  Warnings:

  - You are about to drop the column `authorId` on the `Blogpost` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Blogpost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blogpost" DROP CONSTRAINT "Blogpost_authorId_fkey";

-- AlterTable
ALTER TABLE "Blogpost" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Blogpost" ADD CONSTRAINT "Blogpost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
