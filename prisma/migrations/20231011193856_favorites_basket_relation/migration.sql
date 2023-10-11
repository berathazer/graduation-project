/*
  Warnings:

  - You are about to drop the column `basketId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `favoriteId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `course` table. All the data in the column will be lost.
  - You are about to drop the `_coursetofavorite` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `Basket` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileId` on table `basket` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `courseId` to the `Favorite` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileId` on table `favorite` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Basket_profileId_idx` ON `basket`;

-- DropIndex
DROP INDEX `Course_categoryId_basketId_idx` ON `course`;

-- DropIndex
DROP INDEX `Favorite_profileId_idx` ON `favorite`;

-- AlterTable
ALTER TABLE `basket` ADD COLUMN `courseId` VARCHAR(191) NOT NULL,
    MODIFY `profileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `basketId`,
    DROP COLUMN `favoriteId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `favorite` ADD COLUMN `courseId` VARCHAR(191) NOT NULL,
    MODIFY `profileId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_coursetofavorite`;

-- CreateIndex
CREATE INDEX `unique_profile_course` ON `Basket`(`profileId`, `courseId`);

-- CreateIndex
CREATE INDEX `Basket_courseId_idx` ON `Basket`(`courseId`);

-- CreateIndex
CREATE INDEX `Course_categoryId_idx` ON `Course`(`categoryId`);

-- CreateIndex
CREATE INDEX `unique_profile_course` ON `Favorite`(`profileId`, `courseId`);

-- CreateIndex
CREATE INDEX `Favorite_courseId_idx` ON `Favorite`(`courseId`);
