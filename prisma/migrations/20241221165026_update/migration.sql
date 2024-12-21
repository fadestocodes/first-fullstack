/*
  Warnings:

  - Added the required column `coverPhoto` to the `Blogpost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogpost" ADD COLUMN     "coverPhoto" TEXT NOT NULL;
