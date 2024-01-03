import db from "@/lib/db"

export const getPopularCourses = async () => {
    try {
        return await db.course.findMany({
            where: {
                isPublished: true,
            },
            include: {
                category: true,
                courseLearningOutcome: {
                    orderBy: {
                        order: "asc",
                    },
                },
                chapters: {
                    where: {
                        isPublished: true
                    }
                },
                courseFeature: true,
                favorite: true,
                basket: true,
                reviews: {
                    select: {
                        rating: true,
                    },
                },
            },
        });
    } catch (error: any) {
        console.log("getPopularCoursesError:", error.message);

    }
}