import { FavoriteCourseCardSkeleton } from "@/components/favorite-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";
import { myCoursesNavigation } from "@/lib/navigations";
import React from "react";

const MyCoursesSkeleton = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Kurslarım"
				navigations={myCoursesNavigation}
			/>

			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center  gap-x-5">
				{Array.from({ length: 8 }).map((_, index) => (
					<FavoriteCourseCardSkeleton key={index} />
				))}
			</div>
		</PageWrapper>
	);
};

export default MyCoursesSkeleton;
