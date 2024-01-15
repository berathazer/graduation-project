import db from "@/lib/db";

export const searchCourses = async (searchParams: {
    q: string;
    rating?: string;
    sort?: string;
    level?: string | string[];
    duration?: string | string[];
}) => {
    const keyword = searchParams.q;
    const { rating, level } = searchParams;

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
            whereClause.courseFeature = {
                difficulty: { in: level },
            };
        } else {
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

    const ratingCourses = courses.map(course => {
        let ratingValue = 0;
        if (course.reviews.length > 0) {
            const totalRating = course?.reviews.reduce((sum, vote) => sum + vote.rating, 0);
            const averageRating = totalRating / course.reviews.length;
            ratingValue = !totalRating ? 0 : averageRating;
        }

        if (!rating) {
            return course
        }

        const rate = parseInt(rating.split("_")[1])
        if (ratingValue >= rate) {
            return course
        }

    })


    const filteredRatingCourses = ratingCourses.filter(r => r !== undefined);

    return filteredRatingCourses
};
