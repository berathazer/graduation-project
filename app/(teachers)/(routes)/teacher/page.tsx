import InstructorProfileContainer from "@/containers/InstructorProfileContainer";
import TeacherSkeleton from "@/skeletons/TeacherSkeleton";

import { Suspense } from "react";

const TeachersPage = () => {
	return (
		<Suspense fallback={<TeacherSkeleton />}>
			<InstructorProfileContainer />
		</Suspense>
	);
};

export default TeachersPage;
