import { CourseCategoriesSkeleton } from "@/components/course-categories";
import { SingleCourseCardSkeleton } from "@/components/courses/single-course-card";
import { Skeleton } from "@/components/ui/skeleton";
import PageWrapper from "@/containers/PageWrapper";
import React from "react";

const CoursesSkeleton = () => {
	return (
		<div className="min-h-without_navbar">
			<PageWrapper>
				<CourseCategoriesSkeleton />
				<div className="flex flex-col gap-y-8">
					<Skeleton className="w-[250px] h-16   self-center" />

					<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 place-items-center gap-y-8 gap-x-5">
						{Array.from({ length: 4 }).map((_, index) => (
							<SingleCourseCardSkeleton key={index} />
						))}
					</div>
				</div>
			</PageWrapper>
		</div>
	);
};

export default CoursesSkeleton;
