-- AlterTable
ALTER TABLE "Notifications" ADD COLUMN     "blogpostId" INTEGER,
ADD COLUMN     "postcardId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_blogpostId_fkey" FOREIGN KEY ("blogpostId") REFERENCES "Blogpost"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_postcardId_fkey" FOREIGN KEY ("postcardId") REFERENCES "Postcard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
