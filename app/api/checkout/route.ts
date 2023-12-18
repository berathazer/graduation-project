import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const GET = async (req: NextRequest) => {

    const profile = await currentProfile()
    if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const basket = await db.basket.findMany({
        where: {
            profileId: profile.id || "",
        },
        include: {
            course: true
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    if (basket.length === 0) {
        //baskette ürün yoksa ödeme yapamaz!
        return new NextResponse("Not Found", { status: 404 })
    }

    const courseIds = basket.map(b => b.courseId)
    console.log(courseIds);

    const purchase = await db.purchase.findFirst({
        where: {
            profileId: profile.id,
            courseId: {
                in: courseIds
            }
        }
    })

    if (purchase) {
        return new NextResponse("Already purchased", { status: 400 })
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = basket.map(item => ({
        quantity: 1,
        price_data: {
            currency: "TRY",
            product_data: {
                name: item.course.title,
                description: item.course.description!
            },
            unit_amount: Math.round(item.course.price! * 100)
        }
    }))

    

    return new NextResponse(JSON.stringify(line_items), { status: 200 })


} 