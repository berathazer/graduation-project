import { Attachment, Basket, Category, Chapter, Course, CourseFeature, CourseLearningOutcome, Favorite } from "@prisma/client";

export type CourseWithCategory = Course & {
    category: Category | null
}

export type CourseWithCategoryWithChapters = Course & {
    category: Category | null,
    chapters: Chapter[],
}

export type CourseWithCategoryWithOutcomeWithFeature = Course & {
    category: Category | null,
    courseLearningOutcome: CourseLearningOutcome[],
    courseFeature: CourseFeature | null,
    favorite: Favorite[],
    basket: Basket[]

}

export type CourseWithCategoryWithOutcomeWithFeatureWithFavorite = Course & {
    category: Category | null,
    courseLearningOutcome: CourseLearningOutcome[],
    courseFeature: CourseFeature | null
    favorite: Favorite[]
}

export type CourseWithCategoryWithOutcomeWithFeatureWithBasket = Course & {
    category: Category | null,
    courseLearningOutcome: CourseLearningOutcome[],
    courseFeature: CourseFeature | null,
    basket: Basket[]
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

export type CourseWithFeatureWithChapters = Course & {
    courseFeature: CourseFeature
    chapters: Chapter[],
}