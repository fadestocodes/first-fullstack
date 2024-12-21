/*
  Warnings:

  - You are about to drop the column `coverPhoto` on the `Blogpost` table. All the data in the column will be lost.
  - You are about to drop the column `postcardId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `_UserBookmarks` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `blogId` on table `Comment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postcardId_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_B_fkey";

-- AlterTable
ALTER TABLE "Blogpost" DROP COLUMN "coverPhoto",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postcardId",
ALTER COLUMN "blogId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT;

-- DropTable
DROP TABLE "_UserBookmarks";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogpost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
