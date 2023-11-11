import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { courseId, favoriteId } = await req.json();
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

        const existingBasket = await db.basket.findFirst({
            where: {
                courseId: courseId,
                profileId: profile.id as string
            }
        })

        if (existingBasket) {
            return NextResponse.json({ success: false, error: "Kurs Zaten Sepette" }, { status: 500 })
        }


        if (favoriteId) {
            await db.favorite.delete({
                where: {
                    id: favoriteId,
                    profileId: profile.id,
                    courseId: courseId
                }
            })
        }
        console.log("FavoriteId:", favoriteId);

        const basket = await db.basket.create({
            data: {
                courseId: courseId,
                profileId: profile.id
            }
        })



        return NextResponse.json({ success: true, message: "Sepete Eklendi" }, { status: 200 })


    } catch (error) {
        console.log("PROFILE_BASKET_POST_ERROR");

        return NextResponse.json({ success: false, error: "Beklenmeyen Bir Hata Oluştu" }, { status: 404 })
    }
}