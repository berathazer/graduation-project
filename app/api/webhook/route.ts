import Stripe from "stripe";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import db from "@/lib/db";

export const POST = async (req: NextRequest) => {
    const body = await req.text();

    const signature = headers().get("Stripe-Signature") as string;


    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (error: any) {
        console.log(`Webhook Error: ${error.message}`);

        return new NextResponse(`Webhook Error: ${error.message}`, {
            status
                : 400
        })
    }

    const session = event.data.object as Stripe.Checkout.Session

    const profileId = session?.metadata?.profileId;

    const courses = session?.metadata?.courses;

    if (event.type === "checkout.session.completed") {

        if (!profileId || !courses) {
            console.log("Webhook Error: Missing Metadata");

            return new NextResponse("Webhook Error: Missing Metadata", { status: 400 })
        }

        await db.purchase.createMany({
            data: JSON.parse(courses)
        })

        await db.basket.deleteMany({
            where: {
                profileId
            }
        })

        console.log("Satın Alımlar Başarıyla Eklendi.");

    } else {
        console.log(`Webhook Error: Unhandled Event type: ${event.type}`);
        return new NextResponse(`Webhook Error: Unhandled Event type: ${event.type}`, { status: 200 })
    }

    return new NextResponse(null, { status: 200 })


}