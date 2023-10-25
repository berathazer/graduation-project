import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { checkIsTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const profile = await currentProfile();

        const { title } = await req.json();

        if (!profile || !checkIsTeacher(profile?.userId)) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const course = await db.course.create({
            data: {
                title: title as string,
                profileId: profile.userId,
                categoryId: "",
                instructor: profile.name
            }
        });
        return NextResponse.json({ success: true, course, message: "Kurs Başarıyla Oluşturuldu" })

    } catch (error) {
        return NextResponse.json({ success: false, message: "COURSE_POST_ERROR" }, { status: 500 })
    }

}