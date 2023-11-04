import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest, { params }: {
    params: {
        favoriteId: string
    }
}) => {
    try {
        const profile = await currentProfile();


        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const deletedFavorite = await db.favorite.delete({
            where: {
                profileId: profile.id,
                id: params.favoriteId
            }
        })

        if (!deletedFavorite) {
            return NextResponse.json({ success: false, error: "Kurs bulunamadı." }, { status: 404 })
        }

        return NextResponse.json({ success: true, message: "Favorilerden Kaldırıldı." })


    } catch (error) {
        console.log("PROFILE_FAVORITESID_DELETE_ERROR");

        return NextResponse.json({ success: false, error: "Beklenmeyen Bir Hata Oluştu" }, { status: 404 })
    }
}