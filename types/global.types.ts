import { Category, Course } from "@prisma/client";

export type CourseWithCategory = Course & {
    category: Category
}
