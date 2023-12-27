import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";


const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!, // sondaki ! sayesinde bu değerlerin hiçbir zaman null olmayacağını belirmiş oluyoruz.
    process.env.MUX_TOKEN_SECRET!,
);

export const PATCH = async (req: NextRequest, { params }: {
    params: {
        courseId: string,
        chapterId: string
    }
}) => {

    try {

        const profile = await currentProfile();

        if (!profile) {
            return NextResponse.json({ success: false, message: "Profile Unauthorized" });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                profileId: profile.id
            }
        })

        if (!courseOwner) {
            return NextResponse.json({ success: false, message: "Owner Unauthorized" });
        }

        const chapter = await db.chapter.findFirst({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })

        const muxData = await db.muxData.findFirst({
            where: {
                chapterId: params.chapterId
            }
        })

        if (!chapter || !muxData || !chapter.title || !chapter.description || !chapter.videoUrl) {
            return NextResponse.json({ success: false, message: "Eksik veriler mevcut." }, { status: 404 })
        }

        //asset yeni oluştuğu için statusu preparing oluyor o yüzden kursu yayınla butonuna basıldığında bu işlemi yapmak daha doğru olucak

        const asset = await Video.Assets.get(muxData.assetId);
        console.log("----asset-info/get----");



        const updatedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                isPublished: true,
                duration: asset.duration
            }
        })

        return NextResponse.json({ success: true, chapter: updatedChapter, message: "Bölüm Başarıyla Güncellendi" }, { status: 200 })




    } catch (error) {
        console.log("COURSEID_CHAPTERID_SET-PUBLISH_PATCH_ERROR");

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_SET-PUBLISH_PATCH_ERROR" }, { status: 500 })
    }
}