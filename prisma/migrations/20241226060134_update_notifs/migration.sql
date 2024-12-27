/*
  Warnings:

  - You are about to drop the column `receipientUserId` on the `Notifications` table. All the data in the column will be lost.
  - Added the required column `recipientUserId` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Notifications" DROP CONSTRAINT "Notifications_receipientUserId_fkey";

-- AlterTable
ALTER TABLE "Notifications" DROP COLUMN "receipientUserId",
ADD COLUMN     "recipientUserId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_recipientUserId_fkey" FOREIGN KEY ("recipientUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
