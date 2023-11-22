import { Metadata } from "next";

import { currentProfile } from "@/lib/auth";
import { Suspense } from "react";
import AnalyticsContainer from "@/containers/AnalyticsContainer";
import AnalyticsSkeleton from "@/skeletons/AnalyticsSkeleton";

export const metadata: Metadata = {
	title: "Teacher Analysis",
	description: "Example dashboard app built using the components.",
};

export default async function AnalyticsPage() {
	const profile = await currentProfile();

	return (
		<Suspense fallback={<AnalyticsSkeleton />}>
			<AnalyticsContainer profileId={profile?.id || ""} />
		</Suspense>
	);
}
