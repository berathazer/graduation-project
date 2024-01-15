import { MemberRole } from "@prisma/client";
import db from "./db";
import { useRouter } from "next/router";

export const checkIsTeacher = async (userId?: string | null) => {
    if (!userId) return false;


    const user = await db.profile.findUnique({
        where: {
            userId: userId
        }
    })

    if (!user || user.role !== MemberRole.TEACHER) {
        return false;
    }



    return true;
}



export const checkIsTeacherOrAdmin = async (userId?: string | null) => {
    if (!userId) return false;


    const user = await db.profile.findUnique({
        where: {
            userId: userId
        }
    })



    if (!user || user.role === MemberRole.STUDENT) {
        return false;
    }


    return true;
}