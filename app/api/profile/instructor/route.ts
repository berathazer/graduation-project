import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const values = await req.json();
        const profile = await currentProfile();

        if (!profile || profile.role === "TEACHER" || profile.role === "ADMIN") {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const createInstructor = db.instructor.create({
            data: {
                ...values, profileId: profile.id
            }
        })

        const updateProfile = db.profile.update({
            where: {
                id: profile.id
            }, data: {
                role: MemberRole.TEACHER
            }
        })

        await Promise.all([createInstructor, updateProfile])

        return NextResponse.json({ success: true, message: "Instructor Başarıyla Oluşturuldu." }, { status: 200 })

    } catch (error) {
        console.log("PROFILE_INSTRUCTOR_POST_ERROR: ", error);

        return new NextResponse(JSON.stringify({ success: false, message: "Beklenmeyen Bir Hata Oluştu" }), { status: 500 })
    }
}