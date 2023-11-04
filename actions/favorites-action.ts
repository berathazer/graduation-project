import db from "@/lib/db"

export const getFavorites = async (profileId: string) => {
    try {
        const favorites = await db.favorite.findMany({
            where: {
                profileId: profileId,
            },
        });
        return favorites
    } catch (error) {

    }
}