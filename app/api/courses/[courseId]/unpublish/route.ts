import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
    try {

        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
        }


        const courseOwner = db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile?.id
            }
        })


        if (!courseOwner) {
            return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
        }


        const course = await db.course.update({
            where: {
                id: params.courseId,
                profileId: profile.id
            }, data: {
                isPublished: false
            }
        })

        return NextResponse.json({ success: true, course, message: "Kurs Başarıyla Güncellendi" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_PATCH_ERROR" }, { status: 500 })
    }
}