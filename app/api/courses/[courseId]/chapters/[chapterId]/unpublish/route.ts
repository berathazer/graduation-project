import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: {
    params: {
        courseId: string,
        chapterId: string
    }
}) => {

    try {

        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json({ success: false, message: "Profile Unauthorized" });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id
            }
        })

        if (!courseOwner) {
            return NextResponse.json({ success: false, message: "Owner Unauthorized" });
        }

        const updatedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                isPublished: false
            }
        })

        const publishedChapters = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        })


        //kursun hiç yayınlanmış bölümü yoksa kursuda yayından kaldır.
        if (!publishedChapters.length) {
            await db.course.update({
                where: {
                    id: params.courseId
                }, data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json({ success: true, chapter: updatedChapter, message: "Bölüm Başarıyla Güncellendi" }, { status: 200 })

    } catch (error) {
        console.log("COURSEID_CHAPTERID_SET-PUBLISH_PATCH_ERROR");

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_SET-PUBLISH_PATCH_ERROR" }, { status: 500 })
    }
}