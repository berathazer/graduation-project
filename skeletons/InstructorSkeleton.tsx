import { FavoriteCourseCardSkeleton } from "@/components/favorite-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import PageWrapper from "@/containers/PageWrapper";
import { favoritesNavigation } from "@/lib/navigations";
import React from "react";

const InstructorSkeleton = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Favoriler"
				navigations={favoritesNavigation}
			/>

			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center  gap-x-5">
				{Array.from({ length: 4 }).map((_, index) => (
					<FavoriteCourseCardSkeleton key={index} />
				))}
			</div>
		</PageWrapper>
	);
};

export default InstructorSkeleton;
