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
    const courses = await db.course.findMany({

        where: {
            isPublished: true,
            OR: [
                {
                    title: {
                        search: keyword
                    }
                }
                , {
                    description: {
                        search: keyword
                    }
                },
                {
                    instructor: {
                        search: keyword
                    }
                }
            ]
        },

        include: {
            profile: {
                include: {
                    instructor: true
                }
            },
            _count: {
                select: {
                    chapters: true
                }
            },
            courseLearningOutcome: true
        },


    });


    return courses;
}