import PageWrapper from "@/containers/PageWrapper";
import React from "react";
import NavigationBreadcrumb from "../components/navigation-breadcrumb";
import { basketNavigation } from "@/lib/navigations";
import { BasketCourseCardSkeleton } from "../components/students/basket/basket-course-card";
import { Skeleton } from "../components/ui/skeleton";

const BasketSkeleton = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Sepet"
				navigations={basketNavigation}
			/>
			<div className="flex  flex-1 flex-col gap-y-4 py-8">
				<div className="flex flex-1 md:flex-row gap-x-8">
					<div className="flex flex-1  flex-col gap-y-4">
						{Array.from({ length: 3 }).map((item, index) => (
							<BasketCourseCardSkeleton key={index} />
						))}
					</div>

					<Skeleton className="w-80 border flex justify-center h-80"></Skeleton>
				</div>
			</div>
		</PageWrapper>
	);
};

export default BasketSkeleton;
