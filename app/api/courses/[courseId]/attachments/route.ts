import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
    req: NextRequest,
    { params }: {
        params: {
            courseId: string
        }
    }) => {

    try {
        const profile = await currentProfile();

        const { url } = await req.json();

        if (!profile) {
            return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id

            }
        })

        if (!courseOwner) {
            return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url.split("/").pop(),
                courseId: params.courseId
            }
        })

        return NextResponse.json({ success: true, attachment, message: "Belge Başarıyla Oluşturuldu." });

    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS_POST", error);
        return new NextResponse("Internal Error", { status: 500 });
    }


}