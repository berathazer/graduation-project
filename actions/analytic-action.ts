import db from "@/lib/db";
import { Course } from "@prisma/client";


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


export const getMonthlyIncome = async (profileId: string) => {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);

    const courses = await db.course.findMany({
        where: {
            profileId
        }
    });

    const courseIds = courses.map(c => c.id);

    const monthlyIncomePromises = [];

    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0, 23, 59, 59, 999);

        const promise = db.purchase.aggregate({
            _sum: {
                price: true,
            },
            where: {
                courseId: { in: courseIds },
                createdAt: {
                    gte: startOfMonth.toISOString(),
                    lte: endOfMonth.toISOString(),
                },
            },
        });

        monthlyIncomePromises.push(promise);
    }

    const monthlyIncomeResults = await Promise.all(monthlyIncomePromises);

    const monthlyIncome = monthlyIncomeResults.map((totalIncome, i) => {
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const month = startOfMonth.toLocaleString('tr-TR', { month: 'short' });

        return {
            month,
            total: totalIncome._sum.price || 0,
        };
    });

    // Ayları sırala
    monthlyIncome.sort((a, b) => {
        const monthsOrder = ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"];
        return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
    });

    return monthlyIncome
}
