import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest
    ,
    { params }: {
        params: {
            courseId: string,

        }
    }
) => {
    try {
        const profile = await currentProfile();
        const { title } = await req.json();

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

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId
            }, orderBy: {
                position: "desc"
            }
        })

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
            data: {
                title,
                position: newPosition,
                courseId: params.courseId
            }
        })

        return NextResponse.json({ success: true, chapter, message: "Bölüm Başarıyla Oluşturuldu." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTER_POST_ERROR" }, { status: 500 });
    }
}