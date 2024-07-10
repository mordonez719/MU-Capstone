/*
  Warnings:

  - You are about to drop the column `meals` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `exercises` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "meals";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "exercises";

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WorkoutExercises" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_PlanMeals" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_WorkoutExercises_AB_unique" ON "_WorkoutExercises"("A", "B");

-- CreateIndex
CREATE INDEX "_WorkoutExercises_B_index" ON "_WorkoutExercises"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PlanMeals_AB_unique" ON "_PlanMeals"("A", "B");

-- CreateIndex
CREATE INDEX "_PlanMeals_B_index" ON "_PlanMeals"("B");

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WorkoutExercises" ADD CONSTRAINT "_WorkoutExercises_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanMeals" ADD CONSTRAINT "_PlanMeals_A_fkey" FOREIGN KEY ("A") REFERENCES "Meal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlanMeals" ADD CONSTRAINT "_PlanMeals_B_fkey" FOREIGN KEY ("B") REFERENCES "Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
