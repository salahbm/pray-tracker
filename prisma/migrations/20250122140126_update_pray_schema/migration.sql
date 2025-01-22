/*
  Warnings:

  - You are about to drop the column `userId` on the `Prays` table. All the data in the column will be lost.
  - Added the required column `clerkId` to the `Prays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prays" DROP CONSTRAINT "Prays_userId_fkey";

-- AlterTable
ALTER TABLE "Prays" DROP COLUMN "userId",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prays" ADD CONSTRAINT "Prays_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
