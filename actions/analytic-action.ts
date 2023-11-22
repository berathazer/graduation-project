import db from "@/lib/db";


//profilin toplam kazancını bulur.
export const getTotalProfileEarning = async (profileId: string) => {
    try {
        const profileEarnings = await db.purchase.findMany({
            where: {
                profileId: profileId
            },

            select: { price: true }
        });

        console.log("profileEarnings: ", profileEarnings);

        const totalEarnings = profileEarnings.reduce((acc, purchase) => acc + purchase.price, 0);
        return totalEarnings;
    } catch (error) {
        console.log("getTotalProfileEarning_Error:", error);


    }
}


export const getTotalSubscription = async (profileId: string) => {
    try {
        const totalSubscribers = await db.purchase.count({
            where: {
                profileId: profileId || ""
            },
        });

        return totalSubscribers

    } catch (error) {
        console.log("getTotalProfileEarning_Error");

    }
}

