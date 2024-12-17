/*
  Warnings:

  - You are about to drop the column `city` on the `Blogpost` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Blogpost` table. All the data in the column will be lost.
  - Added the required column `coverPhoto` to the `Blogpost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogpost" DROP COLUMN "city",
DROP COLUMN "country",
ADD COLUMN     "coverPhoto" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT;
