import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { formatCategoryNameToUrl } from "@/lib/helpers";
import { checkIsTeacher } from "@/lib/teacher";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const profile = await currentProfile();
        const isTeacher = await checkIsTeacher(profile?.userId);

        const { title } = await req.json();

        if (!profile || !isTeacher) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const courseExist = await db.course.findFirst({
            where: {
                title: title,
            }
        })

        if (courseExist) {
            return NextResponse.json({ success: false, error: "Böyle bir kurs zaten mevcut başka isim deneyin." })
        }

        const course = await db.course.create({
            data: {
                title: title,
                profileId: profile.id,
                instructor: profile.name,
                url: formatCategoryNameToUrl(title)
            }
        });

        return NextResponse.json({ success: true, course, message: "Kurs Başarıyla Oluşturuldu" })

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSE_POST_ERROR" }, { status: 500 })
    }

}

