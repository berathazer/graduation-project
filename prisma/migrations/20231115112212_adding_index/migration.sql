-- DropIndex
DROP INDEX `Course_title_description_idx` ON `course`;

-- CreateIndex
CREATE FULLTEXT INDEX `Course_description_idx` ON `Course`(`description`);

-- CreateIndex
CREATE FULLTEXT INDEX `Course_instructor_idx` ON `Course`(`instructor`);
