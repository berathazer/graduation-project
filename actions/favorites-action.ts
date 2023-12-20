import db from "@/lib/db"

export const getFavorites = (profileId: string) => {
    if (!profileId) {
        return []
    }
    try {
        return db.favorite.findMany({
            where: {
                profileId: profileId,
            },
        });

    } catch (error) {

    }
}