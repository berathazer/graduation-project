import Mux from "@mux/mux-node";
import { NextRequest, NextResponse } from "next/server";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!, // sondaki ! sayesinde bu değerlerin hiçbir zaman null olmayacağını belirmiş oluyoruz.
    process.env.MUX_TOKEN_SECRET!,
);

export const GET = async (req: NextRequest, { params }: {
    params: {
        assetId: string,
        chapterId: string
    }
}) => {
    try {
        const assetID = "EQx4pptimpDP1ff37fZKD7vxwhXFZmKYW9Uqfhn7dLM"
        const testAsset = await Video.Assets.get(assetID)
        console.log("----asset get----", testAsset);
        return NextResponse.json(testAsset)
    } catch (error) {

    }
}