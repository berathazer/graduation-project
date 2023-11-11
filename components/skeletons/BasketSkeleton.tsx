import PageWrapper from "@/containers/PageWrapper";
import React from "react";
import NavigationBreadcrumb from "../navigation-breadcrumb";
import { basketNavigation } from "@/lib/navigations";
import { BasketCourseCardSkeleton } from "../students/basket/basket-course-card";
import { Skeleton } from "../ui/skeleton";

const BasketSkeleton = () => {
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title="Sepet"
				navigations={basketNavigation}
			/>
			<div className="flex  flex-1 flex-col gap-y-4 ">
				<div className="flex flex-1 flex-col md:flex-row gap-x-8">
					<div className="flex flex-1  flex-col gap-y-4">
						{Array.from({ length: 3 }).map((item, index) => (
							<BasketCourseCardSkeleton key={index} />
						))}
					</div>

					<Skeleton className="w-80 border flex justify-center"></Skeleton>
				</div>
			</div>
		</PageWrapper>
	);
};

export default BasketSkeleton;
