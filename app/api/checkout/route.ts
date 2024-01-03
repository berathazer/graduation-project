import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {

    try {
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


        const metadataCourses = basket.map(b => ({
            profileId: profile.id,
            courseId: b.courseId,
            price: b.course.price
        }))


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


        let stripeCustomer = await db.stripeCustomer.findFirst({
            where: {
                profileId: profile.id
            },
            select: {
                stripeCustomerId: true
            }
        })

        if (!stripeCustomer) {
            const customer = await stripe.customers.create({
                email: profile.email,
            })

            stripeCustomer = await db.stripeCustomer.create({
                data: {
                    profileId: profile.id,
                    stripeCustomerId: customer.id
                }
            })
        }


        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/error`,
            metadata: {
                courses: JSON.stringify(metadataCourses),
                profileId: profile.id
            }
        })

        //stripe işini hallettikten sonra webhooka metadatayı gönderiyor webhookta metadatadan bilgileri alıp 
        //satın alım işlemlerini dbye kaydetmemiz gerekiyor.

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.log("API/CHECKOUT POST ERROR:", error);

        return NextResponse.json({ error: error.message }, { status: 501 });

    }

} 