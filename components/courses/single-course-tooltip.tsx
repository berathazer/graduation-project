import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { strokeWidth } from "@/lib/constant";
import { CourseWithCategoryWithOutcomeWithFeatureWithFavorite } from "@/types/global.types";
import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import AddBasketButton from "../buttons/add-basket-button";
import AddFavoriteButton from "../buttons/add-favorite-button";

import { getFavorites } from "@/actions/favorites-action";
import { findFavoriteId, isFavorite } from "@/lib/favorites";

interface SingleCourseTooltipProps {
	children: React.ReactNode;
	course: CourseWithCategoryWithOutcomeWithFeatureWithFavorite;
	profileId: string;
}
export const SingleCourseTooltip = async ({ children, course, profileId }: SingleCourseTooltipProps) => {
	const favorites = await getFavorites(profileId);

	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side="right"
					className="rounded-none drop-shadow-md"
				>
					<div className="flex flex-col justify-center px-2 w-[300px] gap-y-3 py-4">
						<div className="text-lg font-medium">{course.title}</div>
						<div className="font-medium text-sm text-muted-foreground flex items-center justify-between">
							<span>Created {course.createdAt.toLocaleDateString()}</span>
							<Badge>{course.courseFeature?.difficulty}</Badge>
						</div>
						<div>{course.description}</div>
						<ul className="flex flex-col gap-y-2">
							{course.courseLearningOutcome.slice(0, 3).map((outcome, key) => (
								<li
									key={key}
									className="flex items-start gap-x-4"
								>
									<Check
										strokeWidth={strokeWidth}
										className="w-5 h-5 text-green-500 relative top-1"
									/>
									<span className="flex-1">{outcome.outcomeText}</span>
								</li>
							))}
						</ul>
						<div className="flex items-center gap-x-2">
							<AddBasketButton className="rounded-sm flex-1" />
							<AddFavoriteButton
								isFavorite={isFavorite(favorites!, course.id)}
								courseId={course.id}
								className="px-3"
								variant={"outline"}
								favoriteId={findFavoriteId(favorites!, course.id)?.id}
							/>
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
