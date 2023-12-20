import InstructorIdContainer from "@/containers/InstructorIdContainer";
import { currentProfile } from "@/lib/auth";
import InstructorIdPageSkeleton from "@/skeletons/InstructorIdSkeleton";

import React, { Suspense } from "react";

const InstructorIdPage = async ({ params }: { params: { instructorId: string } }) => {
	const profile = await currentProfile();
	return (
		<Suspense fallback={<InstructorIdPageSkeleton />}>
			<InstructorIdContainer
				instructorId={params.instructorId}
				profileId={profile?.id}
			/>
		</Suspense>
	);
};

export default InstructorIdPage;
