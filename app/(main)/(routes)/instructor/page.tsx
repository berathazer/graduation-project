import InstructorContainer from "@/containers/InstructorContainer";
import { currentProfile } from "@/lib/auth";
import InstructorSkeleton from "@/skeletons/InstructorSkeleton";
import React, { Suspense } from "react";

const InstructorPage = async () => {
	const profile = await currentProfile();

	return (
		<Suspense fallback={<InstructorSkeleton />}>
			<InstructorContainer profile={profile!} />
		</Suspense>
	);
};

export default InstructorPage;
