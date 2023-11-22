import { AnalysisCardSkeleton } from "@/components/teachers/analytics/analysis-card";
import { RecentSalesSkeleton } from "@/components/teachers/analytics/recent-sales";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AnalyticsSkeleton = () => {
	return (
		<div className="flex flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<div className="flex items-center justify-between space-y-2">
					<h2 className="text-3xl font-bold tracking-tight">Analitikler</h2>
					<div className="flex items-center space-x-2">
						<Skeleton className="w-52 h-10"></Skeleton>
						<Skeleton className="w-32 h-10"></Skeleton>
					</div>
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{Array.from({ length: 4 }).map((_, index) => (
						<AnalysisCardSkeleton key={index} />
					))}
				</div>

				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
					<Skeleton className="lg:col-span-4 w-full h-350"></Skeleton>

					<Card className="col-span-3">
						<CardHeader>
							<CardTitle>Yakın Zamandaki Satışlar</CardTitle>
							<Skeleton className="h-6 w-[200px]"></Skeleton>
						</CardHeader>
						<CardContent>
							<RecentSalesSkeleton />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsSkeleton;
