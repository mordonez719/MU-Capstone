/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_username_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "difficulties" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "exSearches" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "exTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "muscles" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "History";
