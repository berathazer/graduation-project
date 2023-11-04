import { Favorite } from "@prisma/client"

export const isFavorite = (favorites: Favorite[], courseId: string) => {
    return favorites!.some((fav) => fav.courseId === courseId)
}


export const findFavoriteId = (favorites: Favorite[], courseId: string) => {
    const favorite = favorites!.find((fav) => fav.courseId === courseId)

    if (!favorite) {
        return null
    }

    return favorite
}