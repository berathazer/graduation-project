import { CourseUrlContainerSkeleton } from "@/containers/CourseUrlContainer";
import React from "react";

const CourseUrlSkeleton = () => {
	return (
		<div className="w-full min-h-without_navbar bg-slate-50">
			<CourseUrlContainerSkeleton />
		</div>
	);
};

export default CourseUrlSkeleton;
