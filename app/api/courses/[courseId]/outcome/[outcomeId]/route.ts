import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const DELETE = async (req: NextRequest, { params }: { params: { courseId: string, outcomeId: string } }) => {

    try {
        const profile = await currentProfile();

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


        const outcome = await db.courseLearningOutcome.delete({
            where: {
                id: params.outcomeId,
                courseId: params.courseId
            }
        })




        return NextResponse.json({ success: true, outcome, message: "Outcome Başarıyla Silindi." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_OUTCOME_POST_ERROR" }, { status: 500 });
    }

}