import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { instructorId: string } }) => {
    try {
        const values = await req.json();
        const profile = await currentProfile();

        if (!profile || profile.role !== "TEACHER") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await db.instructor.update({
            where: {
                id: params.instructorId,
                profileId: profile.id
            }, data: {
                ...values
            }
        })

        return NextResponse.json({ success: true, message: "Instructor Başarıyla Güncellendi." }, { status: 200 })

    } catch (error) {
        console.log("PROFILE_INSTRUCTOR_ID_PATCH_ERROR: ", error);

        return new NextResponse(JSON.stringify({ success: false, message: "Beklenmeyen Bir Hata Oluştu" }), { status: 500 })
    }
}