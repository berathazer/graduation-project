import db from "@/lib/db";

export const searchCourses = async (keyword: string) => {
    const courses = await db.course.findMany({
        where: {
            isPublished: true,
            OR: [
                {
                    title: {
                        contains: keyword,
                    },
                },
                {
                    description: {
                        contains: keyword,
                    },
                },
            ],
        },
    });
    return courses;
}