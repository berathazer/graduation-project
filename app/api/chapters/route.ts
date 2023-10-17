import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
export const GET = async (req: NextRequest) => {
    const { userId } = getAuth(req);
}