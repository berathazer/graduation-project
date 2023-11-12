"use server"

import db from "@/lib/db"
import { cookies } from "next/headers"

export const moveBasketFromCookies = async (profileId: string) => {
    try {
        const isExist = cookies().get("basket")?.value

        if (!isExist) {
            return console.error("Basket not found")
        }

        const courses: string[] = JSON.parse(isExist)

        
        const existingBasketCourses = await db.basket.findMany({
            where: {
                profileId: profileId,
                courseId: { in: courses },
            },
        });


        const newBasketCourses = courses.filter(
            (courseId) =>
                !existingBasketCourses.some(
                    (existingCourse) => existingCourse.courseId === courseId
                )
        );



        const createBasket = db.$transaction([
            ...newBasketCourses.map((courseId) =>
                db.basket.create({
                    data: {
                        profileId: profileId,
                        courseId: courseId,
                    },
                })
            ),
        ]);

        const deleteFavorites = db.favorite.deleteMany({
            where: {
                profileId: profileId,
                courseId: { in: courses },

            },
        })

        await Promise.all([createBasket, deleteFavorites])

        console.log("transaction completed");

        return "success"
    } catch (error) {
        //@ts-ignore
        console.log("move-to-basket-action || bir hata çıktı:", error.message);
        return "error"
    }
}