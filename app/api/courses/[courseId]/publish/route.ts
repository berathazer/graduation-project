import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { courseId: string } }) => {
    try {

        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse(JSON.stringify({ success: false, message: "Unauthorized." }), { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id
            }, include: {
                chapters: {
                    include: {
                        muxData: true
                    }
                }
            }
        })

        if (!course) {
            return new NextResponse(JSON.stringify({ success: false, message: "Kurs Bulunamadı." }), { status: 401 });
        }


        const hasPublishedChapter = course.chapters.some(chapter => chapter.isPublished);
        if (!course.title || !course.description || !course.imageUrl || !course.categoryId || !hasPublishedChapter) {
            return new NextResponse(JSON.stringify({ success: false, message: "Eksik Alanlar Mevcut Kurs Yayınlanamaz" }), { status: 401 });

        }



        const updatedCourse = await db.course.update({
            where: {
                id: params.courseId,
                profileId: profile.id
            }, data: {
                isPublished: true
            }
        })

        return NextResponse.json({ success: true, course: updatedCourse, message: "Kurs Başarıyla Güncellendi" }, { status: 200 })

    } catch (error) {
        return new NextResponse(JSON.stringify({ success: false, error: error, message: "COURSEID_PATCH_ERROR" }), { status: 500 })
    }
}