/*
  Warnings:

  - Made the column `likes` on table `Blogpost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `views` on table `Blogpost` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Blogpost" ALTER COLUMN "likes" SET NOT NULL,
ALTER COLUMN "views" SET NOT NULL;
