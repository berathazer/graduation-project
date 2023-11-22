import { Metadata } from "next";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CalendarDateRangePicker } from "@/components/teachers/analytics/date-range-picker";

import { Overview } from "@/components/teachers/analytics/overview";
import { RecentSales } from "@/components/teachers/analytics/recent-sales";
import { DollarSign, ShoppingCart, Users } from "lucide-react";
import AnalysisCard from "@/components/teachers/analytics/analysis-card";

import { currentProfile } from "@/lib/auth";
import { getTotalProfileEarning, getTotalSubscription } from "@/actions/analytic-action";

export const metadata: Metadata = {
	title: "Teacher Analysis",
	description: "Example dashboard app built using the components.",
};

const analytics = [
	{
		title: "Toplam Gelir",
		Icon: DollarSign,
		body: "45,231.89 TL",
		sub_title: "Geçen aya göre +%20,1",
	},
	{
		title: "Abonelikler",
		Icon: Users,
		body: "+2350",
		sub_title: "Geçen aya göre +180,1%",
	},
	{
		title: "Satışlar",
		Icon: ShoppingCart,
		body: "+12,234",
		sub_title: "Geçen aya göre +%19",
	},
	{
		title: "Aktif Kullanıcı",
		Icon: DollarSign,
		body: "+573",
		sub_title: "Son bir saatten beri +201",
	},
];

export default async function AnalyticsContainer({ profileId }: { profileId: string }) {
	const getRevenues = getTotalProfileEarning(profileId);
	const getSubscribers = getTotalSubscription(profileId);

	const [totalRevenue, totalSubscribers] = await Promise.all([getRevenues, getSubscribers]);

	return (
		<>
			<div className="flex flex-col">
				<div className="flex-1 space-y-4 p-8 pt-6">
					<div className="flex items-center justify-between space-y-2">
						<h2 className="text-3xl font-bold tracking-tight">Analitikler</h2>
						<div className="flex items-center space-x-2">
							<CalendarDateRangePicker />
							<Button>İndir</Button>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						{analytics.map((analytic, index) => (
							<AnalysisCard
								key={index}
								Icon={analytic.Icon}
								body={analytic.body}
								sub_title={analytic.sub_title}
								title={analytic.title}
							/>
						))}
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
						<Card className="col-span-4">
							<CardHeader>
								<CardTitle>Genel Bakış</CardTitle>
							</CardHeader>
							<CardContent className="pl-2">
								<Overview />
							</CardContent>
						</Card>
						<Card className="col-span-3">
							<CardHeader>
								<CardTitle>Yakın Zamandaki Satışlar</CardTitle>
								<CardDescription>Bu ay 265 satış yaptınız.</CardDescription>
							</CardHeader>
							<CardContent className="w-full">
								<RecentSales />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}
