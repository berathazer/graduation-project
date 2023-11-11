import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: { params: { basketId: string } }) => {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const basket = await db.basket.delete({
            where: {
                id: params.basketId,
                profileId: profile.id
            }
        })


        return NextResponse.json({ success: true, message: "Kurs Sepetten Silindi" }, { status: 200 })


    } catch (error) {
        console.log("PROFILE_BASKETID_DELETE_ERROR");

        return NextResponse.json({ success: false, error: "Beklenmeyen Bir Hata Oluştu" }, { status: 404 })
    }
}