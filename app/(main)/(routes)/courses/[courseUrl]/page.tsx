import React, { Suspense } from "react";

import CourseUrlContainer from "@/containers/CourseUrlContainer";
import { currentProfile } from "@/lib/auth";
import CourseUrlSkeleton from "@/skeletons/CourseUrlSkeleton";


interface CourseIdPageProps {
	params: {
		courseUrl: string;
	};
}

const CourseIdPage = async ({ params }: CourseIdPageProps) => {
	const profile = await currentProfile();
	
	return (
		<Suspense fallback={<CourseUrlSkeleton />}>
			<CourseUrlContainer
				courseUrl={params.courseUrl}
				profileId={profile?.id || ""}
			/>
		</Suspense>
	);
};

export default CourseIdPage;
