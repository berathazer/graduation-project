import db from "@/lib/db"

export const getBasket = (profileId: string) => {
    if (!profileId) {
        return []
    }
    try {
        return db.basket.findMany({
            where: {
                profileId
            }
        })
    } catch (error) {

    }
}


