import MyCoursesContainer from "@/containers/MyCoursesContainer";
import { currentProfile } from "@/lib/auth";
import MyCoursesSkeleton from "@/skeletons/MyCoursesSkeleton";
import React, { Suspense } from "react";

const MyCoursesPage = async () => {
	const profile = await currentProfile();
	return (
		<Suspense fallback={<MyCoursesSkeleton />}>
			<MyCoursesContainer profileId={profile?.id} />
		</Suspense>
	);
};

export default MyCoursesPage;
