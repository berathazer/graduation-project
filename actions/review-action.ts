import { db } from "@/lib/db";

export const getReview = async (
    profileId: string,
    courseId: string,
) => {
    try {
        return db.review.findFirst({
            where: {
                courseId: courseId,
                userId: profileId
            }
        })

    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return null;
    }
}