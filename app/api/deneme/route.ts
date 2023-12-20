import { currentProfile } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const profile = await currentProfile()
    return NextResponse.json("deneme rotası");

}