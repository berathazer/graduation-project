import db from "@/lib/db";

export const searchCourses = async (keyword: string) => {

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
            }
        }
    });

    
    return courses;
}