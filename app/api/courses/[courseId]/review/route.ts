import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: {
    params: {
        courseId: string
    }
}) => {

    try {

        const [profile, { review, rating }] = await Promise.all([currentProfile(), req.json()])


        if (!profile) {
            return new NextResponse(JSON.stringify({ success: false, message: "Unauthorized." }), { status: 401 });
        }

        if (!review || !rating) {
            return new NextResponse(JSON.stringify({ success: false, message: "Missing values." }), { status: 401 });
        }

        const existingReview = await db.review.findFirst({
            where: {
                courseId: params.courseId,
                userId: profile.id
            }
        })

        if (!existingReview) {
            await db.review.create({
                data: {
                    rating: rating,
                    comment: review,
                    courseId: params.courseId,
                    userId: profile.id
                }
            })
        } else {
            await db.review.updateMany({
                where: {
                    courseId: params.courseId,
                    userId: profile.id
                },
                data: {
                    rating: rating,
                    comment: review,
                }
            })
        }

        return NextResponse.json({ message: "Yorum başarıyla güncellendi" }, { status: 200 })



    } catch (error) {

        console.log("COURSEID_REVIEW_PUT_ERROR", error);

        return NextResponse.json({
            message: "COURSEID_REVIEW_PUT_ERROR", error
        })

    }

}
