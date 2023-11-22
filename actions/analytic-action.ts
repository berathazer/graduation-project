import db from "@/lib/db";

export const getProfileEarnings = async (profileId: string) => {
    const profileEarnings = await db.purchase.findMany({
        where: {},
        select: { price: true }
    });

    const totalEarnings = profileEarnings.reduce((acc, purchase) => acc + purchase.price, 0);

}