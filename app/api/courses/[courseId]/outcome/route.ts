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
        const { outcomeText } = await req.json();

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

        const lastOutcome = await db.courseLearningOutcome.findFirst({
            where: {
                courseId: params.courseId
            }, orderBy: {
                order: "desc"
            }
        })

        const newPosition = lastOutcome ? lastOutcome.order + 1 : 1;


        const outcome = await db.courseLearningOutcome.create({
            data: {
                outcomeText: outcomeText,
                courseId: params.courseId,
                order: newPosition
            }
        })

        return NextResponse.json({ success: true, outcome, message: "Outcome Başarıyla Oluşturuldu." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_OUTCOME_POST_ERROR" }, { status: 500 });
    }
}