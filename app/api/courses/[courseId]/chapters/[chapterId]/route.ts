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



        const chapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }, data: {
                ...values
            }
        })
        console.log("----chapter updated----");

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
                console.log("----existing mux----");
            }

            const asset = await Video.Assets.create({
                input: chapter.videoUrl!,
                playback_policy: "public",
                test: false
            });

            console.log("----asset created----");

            await db.muxData.create({
                data: {
                    assetId: asset.id,
                    chapterId: chapter.id,
                    playbackId: asset.playback_ids?.[0]?.id
                }
            })


            console.log("----muxdata created----");


        }

        return NextResponse.json({ success: true, chapter }, { status: 200 })

    } catch (error) {
        console.log("COURSEID_CHAPTERID_PATCH_ERROR");

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_PATCH_ERROR" }, { status: 500 })
    }
}



export const DELETE = async (
    req: NextRequest
    ,
    { params }: {
        params: {
            courseId: string,
            chapterId: string
        }
    }) => {

    try {

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



        const chapter = await db.chapter.findFirst({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })

        if (!chapter) {
            return NextResponse.json({ success: false, message: "Bölüm bulunamadı." }, { status: 404 })
        }


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
                console.log("----existing mux----");
            }

            const asset = await Video.Assets.create({
                input: chapter.videoUrl!,
                playback_policy: "public",
                test: false
            });

        }

        const deletedChapter = await db.chapter.delete({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            }
        })


        const publishedChaptersInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        });

        //eğer kursun hiç yayınlanmış bölümü yoksa kursuda yayından kaldırıyoruz.
        if (!publishedChaptersInCourse.length) {
            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data: {
                    isPublished: false,
                }
            });
        }


        return NextResponse.json({ success: true, deletedChapter }, { status: 200 })

    } catch (error) {
        console.log("COURSEID_CHAPTERID_PATCH_ERROR");

        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_PATCH_ERROR" }, { status: 500 })
    }
}
