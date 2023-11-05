import db from "@/lib/db"

export const getBasket = async (profileId: string) => {
    if (!profileId) {
        return []
    }
    try {
        const basket = await db.basket.findMany({
            where: {
                profileId
            }
        })

        return basket
    } catch (error) {

    }
}