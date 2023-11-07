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

        const courseOwner = await db.course.findUnique({
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
                courseId: params.courseId,
            }
        })



        return new NextResponse(JSON.stringify({ success: true, message: "Bölüm Başarıyla Oluşturuldu." }), { status: 200 });

    } catch (error) {
        console.log("COURSEID_CHAPTER_POST_ERROR", error);

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTER_POST_ERROR" }, { status: 500 });
    }
}