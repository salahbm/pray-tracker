/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `Prays` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Prays` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prays" DROP CONSTRAINT "Prays_userId_fkey";

-- AlterTable
ALTER TABLE "Prays" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Prays_userId_date_key" ON "Prays"("userId", "date");

-- AddForeignKey
ALTER TABLE "Prays" ADD CONSTRAINT "Prays_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
