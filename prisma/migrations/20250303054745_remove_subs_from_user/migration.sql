/*
  Warnings:

  - You are about to drop the column `premium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `premiumExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "premium",
DROP COLUMN "premiumExpiry";
