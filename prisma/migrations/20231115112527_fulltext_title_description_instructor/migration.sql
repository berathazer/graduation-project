-- DropIndex
DROP INDEX `Course_description_idx` ON `course`;

-- DropIndex
DROP INDEX `Course_instructor_idx` ON `course`;

-- CreateIndex
CREATE FULLTEXT INDEX `Course_title_description_instructor_idx` ON `Course`(`title`, `description`, `instructor`);
