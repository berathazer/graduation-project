-- AlterTable
ALTER TABLE `coursefeature` ADD COLUMN `description` TEXT NULL,
    ADD COLUMN `difficulty` ENUM('Beginner', 'Intermediate', 'Advanced') NULL,
    MODIFY `resourceCount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `lifetimeAccess` BOOLEAN NULL DEFAULT true;

-- CreateTable
CREATE TABLE `CourseLearningOutcome` (
    `id` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `outcomeText` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `CourseLearningOutcome_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
