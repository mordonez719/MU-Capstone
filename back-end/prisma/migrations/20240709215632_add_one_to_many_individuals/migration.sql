/*
  Warnings:

  - You are about to drop the `_PlanMeals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_WorkoutExercises` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workoutID` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planID` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_PlanMeals" DROP CONSTRAINT "_PlanMeals_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlanMeals" DROP CONSTRAINT "_PlanMeals_B_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutExercises" DROP CONSTRAINT "_WorkoutExercises_A_fkey";

-- DropForeignKey
ALTER TABLE "_WorkoutExercises" DROP CONSTRAINT "_WorkoutExercises_B_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "workoutID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "planID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_PlanMeals";

-- DropTable
DROP TABLE "_WorkoutExercises";

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutID_fkey" FOREIGN KEY ("workoutID") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_planID_fkey" FOREIGN KEY ("planID") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
