import { NextRequest, NextResponse } from "next/server"

export const PATCH = (
    req: NextRequest
    ,
    { params }: {
        params: {
            courseId: string,
            chapterId: string
        }
    }) => {

    try {

    } catch (error) {
        return NextResponse.json({ success: false, error: error, message: "COURSEID_CHAPTERID_PATCH_ERROR" }, { status: 500 })
    }
}


