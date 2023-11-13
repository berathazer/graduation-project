/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[url]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instructor` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `chapter` ADD COLUMN `duration` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `instructor` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `coursefeature` MODIFY `difficulty` ENUM('Beginner', 'Intermediate', 'Advanced', 'All') NULL;

-- AlterTable
ALTER TABLE `courselearningoutcome` MODIFY `order` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `headline` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `biography` TEXT NOT NULL,
    `profileId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Instructor_email_key`(`email`),
    INDEX `Instructor_profileId_idx`(`profileId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Course_title_key` ON `Course`(`title`);

-- CreateIndex
CREATE UNIQUE INDEX `Course_url_key` ON `Course`(`url`);
