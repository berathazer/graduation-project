import { Attachment, Category, Chapter, Course, CourseFeature, CourseLearningOutcome } from "@prisma/client";

export type CourseWithCategory = Course & {
    category: Category | null
}

export type CourseWithCategoryWithChapters = Course & {
    category: Category | null,
    chapters: Chapter[],
}



export type CourseWithCategoryWithChaptersWithAttachments = Course & {
    category: Category | null,
    chapters: Chapter[],
    attachments: Attachment[]
}

export type CourseWithAll = Course & {
    category: Category | null,
    chapters: Chapter[],
    attachments: Attachment[],
    courseLearningOutcome: CourseLearningOutcome[],
    courseFeature: CourseFeature
}
