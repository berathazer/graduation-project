/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `profileId` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `parentId` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `course` MODIFY `categoryId` VARCHAR(191) NOT NULL,
    MODIFY `profileId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `profile` ADD COLUMN `role` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- CreateTable
CREATE TABLE `CourseFeature` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `totalDuration` TEXT NULL,
    `resourceCount` INTEGER NOT NULL,
    `lifetimeAccess` BOOLEAN NOT NULL DEFAULT true,
    `shareLink` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CourseFeature_courseId_key`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `comment` VARCHAR(191) NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Review_courseId_idx`(`courseId`),
    INDEX `Review_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Category_url_key` ON `Category`(`url`);

-- CreateIndex
CREATE INDEX `Category_parentId_idx` ON `Category`(`parentId`);

-- CreateIndex
CREATE INDEX `Course_profileId_idx` ON `Course`(`profileId`);
