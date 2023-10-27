import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
    req: NextRequest,
    { params }: {
        params: {
            courseId: string,
            attachmentId: string
        }
    }) => {


    try {

        const profile = await currentProfile();
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

        const attachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId,
            }
        })

        return NextResponse.json({ success: true, attachment, message: "Belge Başarıyla Silindi." });

    } catch (error) {
        console.log("COURSE_ID_ATTACHMENTS_ID_DELETE", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

