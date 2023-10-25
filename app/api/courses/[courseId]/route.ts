import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { checkIsTeacher } from "@/lib/teacher";
import { NextRequest, NextResponse } from "next/server";


export const PATCH = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
    try {

        const profile = await currentProfile();
        const isTeacher = await checkIsTeacher(profile?.userId);

        const values = await req.json();

        if (!profile || !isTeacher) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.update({
            where: {
                id: params.courseId,
                profileId: profile.id
            }, data: { ...values }
        })

        return NextResponse.json({ success: true, course, message: "Kurs Başarıyla Güncellendi" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_PATCH_ERROR" }, { status: 500 })
    }
}