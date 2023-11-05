import { Basket } from "@prisma/client";
import Cookies from "js-cookie";
export const getBasketFromCookies = () => {
    const existingBasket = Cookies.get("basket");

    if (!existingBasket) {
        return []
    }

    return JSON.parse(existingBasket)
}

export const isExistFromCookies = (basket: string[], courseId: string) => {

    return basket.includes(courseId)
}

export const isExistFromDb = (basket: Basket[], courseId: string) => {

    const isExist = basket.some(item => item.courseId === courseId)

    if (!isExist) {
        return false
    }

    return true
}