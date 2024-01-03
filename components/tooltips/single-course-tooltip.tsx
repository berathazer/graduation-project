import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { strokeWidth } from "@/lib/constant";
import { CourseWithCategoryWithOutcomeWithFeatureWithFavorite } from "@/types/global.types";
import { BadgeInfo, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import AddBasketButton from "../buttons/add-basket-button";
import AddFavoriteButton from "../buttons/add-favorite-button";

import { getFavorites } from "@/actions/favorites-action";
import { findFavoriteId, isFavorite } from "@/lib/favorites";
import { getBasket } from "@/actions/basket-action";
import { isPromise } from "util/types";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { formatReviewDate } from "@/lib/helpers";

interface SingleCourseTooltipProps {
	children: React.ReactNode;
	course: CourseWithCategoryWithOutcomeWithFeatureWithFavorite;
	profileId: string;
	isPurchased: boolean;
}

export const SingleCourseTooltip = async ({
	children,
	course,
	profileId,
	isPurchased,
}: SingleCourseTooltipProps) => {
	const [favorites, basket] = await Promise.all([getFavorites(profileId), getBasket(profileId)]);

	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent
					side="right"
					className="rounded-none drop-shadow-md"
				>
					{!isPurchased && (
						<div className="flex flex-col justify-center px-2 w-[300px] gap-y-3 py-4">
							<div className="text-lg font-medium">{course.title}</div>
							<div className="font-medium text-sm text-muted-foreground flex items-center justify-between">
								<span>{formatReviewDate(course.createdAt)}</span>
								<Badge>{course.courseFeature?.difficulty}</Badge>
							</div>

							<div className="line-clamp-6 pb-6">{course.description}</div>

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
								<AddBasketButton
									className="rounded-sm flex-1"
									courseId={course.id}
									basket={basket!}
									//isFavorite={isFavorite(favorites!, course.id)}
									favoriteId={findFavoriteId(favorites!, course.id)?.id}
								/>
								<AddFavoriteButton
									className="px-3"
									variant={"outline"}
									courseId={course.id}
									basket={basket!}
									isFavorite={isFavorite(favorites!, course.id)}
									favoriteId={findFavoriteId(favorites!, course.id)?.id}
								/>
							</div>
						</div>
					)}

					{isPurchased && (
						<div className="flex flex-col gap-y-2 py-4 px-2 rounded-md">
							<Alert variant="default">
								<BadgeInfo className="w-4 h-4" />
								<AlertTitle>Bu kursu zaten satın aldınız.</AlertTitle>
							</Alert>

							<Link
								href={"/my-courses"}
								className="w-full"
							>
								<Button className="w-full">Kurslarıma Git</Button>
							</Link>
						</div>
					)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
