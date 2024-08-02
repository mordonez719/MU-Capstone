/*
  Warnings:

  - You are about to drop the column `difficulties` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `exSearches` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `exTypes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `muscles` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "difficulties",
DROP COLUMN "exSearches",
DROP COLUMN "exTypes",
DROP COLUMN "muscles";

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Difficulty" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Type" ADD CONSTRAINT "Type_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Muscle" ADD CONSTRAINT "Muscle_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Difficulty" ADD CONSTRAINT "Difficulty_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("user") ON DELETE RESTRICT ON UPDATE CASCADE;
