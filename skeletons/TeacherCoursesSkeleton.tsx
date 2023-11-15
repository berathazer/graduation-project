import { CourseCardSkeleton } from "@/components/course-card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TeacherCoursesSkeleton = () => {
	return (
		<div className="p-6">
			<div className="pb-4">
				<Skeleton className="w-32 h-10" />
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<CourseCardSkeleton key={index} />
				))}
			</div>
		</div>
	);
};

export default TeacherCoursesSkeleton;
