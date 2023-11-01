import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { courseId: string, featureId: string } }) => {

    try {
        const values = await req.json()

        const profile = await currentProfile();

        if (!profile) {
            console.log("----profile unauthorized----");

            return NextResponse.json({ success: false, message: "Profile Unauthorized" });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id
            }
        })

        if (!courseOwner) {
            console.log("----owner unauthorized----");
            return NextResponse.json({ success: false, message: "Owner Unauthorized" });
        }

        const feature = await db.courseFeature.update({
            where: {
                id: params.featureId,
                courseId: params.courseId
            }, data: { ...values }
        })




        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        console.log("COURSEID_FEATUREID_PATCH_ERROR");
        1
        return NextResponse.json({ success: false, error: error, message: "COURSEID_FEATUREID_PATCH_ERROR" }, { status: 500 })
    }

}