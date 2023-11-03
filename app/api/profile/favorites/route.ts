import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { courseId } = await req.json();
        const profile = await currentProfile();


        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const course = await db.course.findFirst({
            where: {
                id: courseId
            }
        })

        if (!course) {
            return NextResponse.json({ success: false, error: "Kurs bulunamadı." }, { status: 404 })
        }

        const existingFavorite = await db.favorite.findFirst({
            where: {
                courseId: courseId,
                profileId: profile.id as string
            }
        })

        if (existingFavorite) {
            return NextResponse.json({ success: false, error: "Kurs Zaten Favorilerde" }, { status: 500 })
        }


        const favorite = await db.favorite.create({
            data: {
                courseId: courseId,
                profileId: profile.id
            }
        })


        return NextResponse.json({ success: true, favorite, message: "Favoriye Eklendi" }, { status: 200 })


    } catch (error) {
        console.log("PROFILE_FAVORITES_POST_ERROR");

        return NextResponse.json({ success: false, error: "Beklenmeyen Bir Hata Oluştu" }, { status: 404 })
    }
}