import { currentProfile } from "@/lib/auth"
import db from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

//Reorder fonksiyonu için
export const PUT = async (
    req: NextRequest
    ,
    { params }: {
        params: {
            courseId: string,
            chapterId: string
        }
    }) => {

    try {

        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json({ success: false, message: "Profile Unauthorized." }, { status: 401 });
        }

        //bu listenin içinde chapter_id ve position bilgisi var List[{id,position},...]
        const { list }: { list: { id: string; position: number }[] } = await req.json();

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id
            }
        })

        if (!courseOwner) {
            return NextResponse.json({ success: false, message: "Youre Not The Owner Unauthorized." }, { status: 401 });
        }

        for (let item of list) {
            await db.courseLearningOutcome.update({
                where: { id: item.id },
                data: { order: item.position }
            });
        }


        return NextResponse.json({ success: true, message: "Sıralama Başarılı" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_OUTCOME_REORDER_PUT_ERROR" }, { status: 500 })
    }
}
