import db from "./db";

export const checkIsTeacher = async (userId?: string | null) => {
    if (!userId) return false;

    const user = await db.profile.findUnique({
        where: {
            userId: userId
        }
    })

    if (!user || user.role !== "TEACHER") {
        return false;
    }

    return true;
}