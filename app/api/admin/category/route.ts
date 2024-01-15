import { currentProfile } from "@/lib/auth"
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const [profile, body] = await Promise.all([currentProfile(), req.json()])

        if (profile?.role !== MemberRole.ADMIN) {
            return new NextResponse(JSON.stringify({ success: false, message: "Bu İşlem İçin Yetkiniz  Yok !!!" }), { status: 400 })
        }


        const existingCategoy = await db.category.findFirst({
            where: {
                name: body.name
            }
        })

        if (existingCategoy) {
            return new NextResponse(JSON.stringify({ success: false, message: "Böyle bir kurs zaten mevcut" }), { status: 400 })
        }


        const category = await db.category.create({
            data: {
                name: body.name,
                url: body.url,
                imageUrl: body?.imageUrl
            }
        })

        return NextResponse.json({ success: true, category }, { status: 200 });

    } catch (error) {
        console.log("ADMIN_CATEGORY_POST_ERROR: ", error);

        return new NextResponse(JSON.stringify({ success: false, message: "Beklenmeyen Bir Hata Oluştu" }), { status: 500 })
    }
}