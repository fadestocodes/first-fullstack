/*
  Warnings:

  - You are about to drop the column `counntry` on the `Postcard` table. All the data in the column will be lost.
  - Added the required column `caption` to the `Postcard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Postcard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Postcard" DROP COLUMN "counntry",
ADD COLUMN     "caption" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;
