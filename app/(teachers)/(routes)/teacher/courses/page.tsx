import TeacherCoursesContainer from "@/containers/TeacherCoursesContainer";
import { currentProfile } from "@/lib/auth";
import TeacherCoursesSkeleton from "@/skeletons/TeacherCoursesSkeleton";
import { Suspense } from "react";

const CoursesPage = async () => {
	const profile = await currentProfile();
	return (
		<Suspense fallback={<TeacherCoursesSkeleton />}>
			<TeacherCoursesContainer profileId={profile?.id || ""} />
		</Suspense>
	);
};

export default CoursesPage;
