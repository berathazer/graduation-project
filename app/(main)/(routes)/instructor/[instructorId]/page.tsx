import InstructorIdContainer from "@/containers/InstructorIdContainer";
import InstructorIdPageSkeleton from "@/skeletons/InstructorIdSkeleton";

import React, { Suspense } from "react";

const InstructorIdPage = async ({ params }: { params: { instructorId: string } }) => {
	return (
		<Suspense fallback={<InstructorIdPageSkeleton />}>
			<InstructorIdContainer instructorId={params.instructorId} />
		</Suspense>
	);
};

export default InstructorIdPage;
