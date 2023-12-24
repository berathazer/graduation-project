import db from "@/lib/db";


//profilin toplam kazancını bulur.
export const getTotalProfileEarning = async (profileId: string) => {
    try {
        const profileEarnings = await db.purchase.findMany({
            where: {
                course: {
                    profileId: profileId
                }
            },

            select: { price: true }
        });

        const totalEarnings = profileEarnings.reduce((acc, purchase) => acc + purchase.price, 0);
        return totalEarnings;
    } catch (error) {
        console.log("getTotalProfileEarning_Error:", error);


    }
}


export const getTotalSubscription = async (profileId: string) => {
    try {
        return db.purchase.count({
            where: {
                profileId: profileId || ""
            },
        });


    } catch (error) {
        console.log("getTotalProfileEarning_Error");

    }
}


export const getLastPurchases = async (profileId: string) => {
    try {
        return db.purchase.findMany({
            where: {
                course: {
                    profileId
                }
            }, select: {
                price: true,
                profile: {
                    select: {
                        email: true,
                        name: true,
                        imageUrl: true
                    }
                }
            }, orderBy: {
                createdAt: "asc"
            }
        })

    } catch (error) {
        console.log("getLastPurchases_Error");
    }
}