-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPro" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "proUntil" TIMESTAMP(3);
