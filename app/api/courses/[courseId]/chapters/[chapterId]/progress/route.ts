import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: {
    params: {
        courseId: string,
        chapterId: string
    }
}) => {

    try {


        const [profile, { isCompleted }] = await Promise.all([currentProfile(), req.json()])


        if (!profile) {
            return NextResponse.json({ success: false, message: "Profile Unauthorized" });
        }

        const userProgress = await db.userProgress.upsert({
            where: {
                profileId_chapterId: {
                    profileId: profile.id,
                    chapterId: params.chapterId
                },
            },
            update: {
                isCompleted
            },
            create: {
                chapterId: params.chapterId,
                profileId: profile.id,
                isCompleted
            }
        })


        return NextResponse.json({ success: true, userProgress, message: "Bölüm Gelişimi Başarıyla Güncellendi" }, { status: 200 })




    } catch (error) {
        console.log("COURSEID_CHAPTERID_PROGRESS_ERROR:", error);

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_PROGRESS_ERROR-PUBLISH_PATCH_ERROR" }, { status: 500 })
    }
}