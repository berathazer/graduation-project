import InstructorProfileContainer from "@/containers/InstructorProfileContainer";

import { Suspense } from "react";

const TeachersPage = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<InstructorProfileContainer />
		</Suspense>
	);
};

export default TeachersPage;
