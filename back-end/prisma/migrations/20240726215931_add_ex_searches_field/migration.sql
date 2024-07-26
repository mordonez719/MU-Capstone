/*
  Warnings:

  - You are about to drop the column `caloricMax` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `caloricMin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `diets` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `difficulties` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dishTypes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `exSearches` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `exTypes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `healths` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `mealSearches` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `muscles` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "caloricMax",
DROP COLUMN "caloricMin",
DROP COLUMN "diets",
DROP COLUMN "difficulties",
DROP COLUMN "dishTypes",
DROP COLUMN "exSearches",
DROP COLUMN "exTypes",
DROP COLUMN "healths",
DROP COLUMN "mealSearches",
DROP COLUMN "muscles";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "exSearches" TEXT[],
    "exTypes" TEXT[],
    "muscles" TEXT[],
    "difficulties" TEXT[],
    "username" TEXT NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_username_key" ON "History"("username");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;
