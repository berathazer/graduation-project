import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { Video } = new Mux(
    process.env.MUX_TOKEN_ID!, // sondaki ! sayesinde bu değerlerin hiçbir zaman null olmayacağını belirmiş oluyoruz.
    process.env.MUX_TOKEN_SECRET!,
);

export const GET = async () => {
    try {
        const assetID = "EQx4pptimpDP1ff37fZKD7vxwhXFZmKYW9Uqfhn7dLM"
        const testAsset = await Video.Assets.get(assetID)
        return NextResponse.json(testAsset)
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}