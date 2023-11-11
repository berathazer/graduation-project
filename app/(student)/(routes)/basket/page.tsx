import BasketSkeleton from "@/skeletons/BasketSkeleton";

import BasketContainer from "@/containers/BasketContainer";

import { currentProfile } from "@/lib/auth";

import React, { Suspense } from "react";

const BasketPage = async () => {
	const profile = await currentProfile();

	return (
		<Suspense fallback={<BasketSkeleton />}>
			<BasketContainer profileId={profile?.id!}></BasketContainer>
		</Suspense>
	);
};

export default BasketPage;
