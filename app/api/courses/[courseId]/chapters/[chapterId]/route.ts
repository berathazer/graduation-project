import { currentProfile } from "@/lib/auth"
import db from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import Mux from "@mux/mux-node"


const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!, // sondaki ! sayesinde bu değerlerin hiçbir zaman null olmayacağını belirmiş oluyoruz.
    process.env.MUX_TOKEN_SECRET!,
);


export const PATCH = async (
    req: NextRequest
    ,
    { params }: {
        params: {
            courseId: string,
            chapterId: string
        }
    }) => {

    try {
        //isPublished alanının yanlışlıkla güncellenmesini engellemek için gleen veriden isPublished alanını çıkarıyoruz.
        const { isPublished, ...values } = await req.json()

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



        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                ...values
            }
        })


        if (chapter.videoUrl) {

            const existingMux = await db.muxData.findFirst({
                where: {
                    chapterId: chapter.id
                }
            })

            if (existingMux) {
                await Video.Assets.del(existingMux.assetId);
                await db.muxData.delete({
                    where: {
                        id: existingMux.id
                    }
                })
            }

            const asset = await Video.Assets.create({
                input: chapter.videoUrl!,
                playback_policy: "public",
                test: false
            });


            await db.muxData.create({
                data: {
                    assetId: asset.id,
                    chapterId: chapter.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })

            
        }





        return NextResponse.json({ success: true, chapter }, { status: 200 })


    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_PATCH_ERROR" }, { status: 500 })
    }
}


