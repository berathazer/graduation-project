import { currentProfile } from "@/lib/auth"
import db from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, { params }: { params: { categoryId: string } }) => {
    try {
        const [profile, values] = await Promise.all([currentProfile(), req.json()])

        if (profile?.role !== MemberRole.ADMIN) {
            return new NextResponse(JSON.stringify({ success: false, message: "Bu İşlem İçin Yetkiniz  Yok !!!" }), { status: 400 })
        }


        const existingCategoy = await db.category.findFirst({
            where: {
                name: values?.name || "",
                url: values?.url || ""
            }
        });


        if (existingCategoy && existingCategoy.id !== params.categoryId) {
            return new NextResponse(JSON.stringify({ success: false, message: "Böyle bir kategori zaten mevcut" }), { status: 400 })
        }


        const category = await db.category.update({
            where: {
                id: params.categoryId
            },
            data: { ...values }
        })

        return NextResponse.json({ success: true, category }, { status: 200 });

    } catch (error) {
        console.log("ADMIN_CATEGORY_POST_ERROR: ", error);

        return new NextResponse(JSON.stringify({ success: false, message: "Beklenmeyen Bir Hata Oluştu" }), { status: 500 })
    }
}