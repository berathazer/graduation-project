import db from "@/lib/db";

export const searchCourses = async (searchParams: {
    q: string;
    rating?: string;
    sort?: string;
    level?: string | string[];
    duration?: string | string[];
}) => {
    const keyword = searchParams.q;
    const { rating, sort, level, duration } = searchParams;

    console.log("searchParams: ", searchParams);

    const whereClause: any = {
        isPublished: true,
        OR: [
            { title: { search: keyword } },
            { description: { search: keyword } },
            { instructor: { search: keyword } },
        ],
    };

    if (level) {
        if (Array.isArray(level)) {
            // Handle array case
            whereClause.courseFeature = {
                difficulty: { in: level },
            };
        } else {
            // Handle string case
            whereClause.courseFeature = {
                difficulty: level,
            };
        }
    }


    const courses = await db.course.findMany({
        where: whereClause,
        include: {
            profile: {
                include: {
                    instructor: true,
                },
            },
            _count: {
                select: {
                    chapters: true,
                },
            },
            courseLearningOutcome: true,
            reviews: {
                select: {
                    rating: true,
                },
            },
        },

    });

    return courses;
};
