import { MemberRole } from "@prisma/client";
import db from "./db";

export const checkIsAdmin = async (userId: string | null) => {
    if (!userId) return false;


    const user = await db.profile.findUnique({
        where: {
            userId: userId || ""
        }
    })

    if (!user || user.role !== MemberRole.ADMIN) {
        return false;
    }



    return true;
}