import React from "react";

import CourseRating from "../courses/course-rating";
import { formatProductPrice } from "@/lib/helpers";
import { Check, TagIcon } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { Course, CourseLearningOutcome, Instructor, Profile } from "@prisma/client";
import LoadingImage from "../courses/loading-image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import InstructorCard from "../teachers/instructor/instructor-card";

interface SearchCourseCardProps {
	course: Course & {
		_count: {
			chapters: number;
		};
		courseLearningOutcome: CourseLearningOutcome[];
		profile: Profile & {
			instructor: Instructor | null;
		};
		reviews: {
			rating: number;
		}[];
	};
}
const SearchCourseCard = ({ course }: SearchCourseCardProps) => {
	const totalRating = course.reviews.reduce((sum, vote) => sum + vote.rating, 0);

	const averageRating = totalRating / course.reviews.length;
	const ratingValue = !totalRating ? 0 : averageRating;
	
	return (
		<TooltipProvider delayDuration={1}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						href={`/courses/${course.url}`}
						className="flex w-full gap-x-4"
					>
						<LoadingImage
							title={course.title}
							imageUrl={course.imageUrl || ""}
							className="relative w-[242px] h-[137px] border flex-none"
						/>

						<div className="flex flex-col flex-1 relative bottom-1 gap-y-1 ">
							<p className="font-bold text-sm">{course.title}</p>
							<p className="text-sm font-medium line-clamp-4">{course.description}</p>
							<span className="text-xs text-muted-foreground">{`(${course.instructor})`}</span>
							<CourseRating
								color="orange"
								rating={ratingValue}
								size={16}
								valueShow
							/>
							<div className="flex gap-x-2 py-2">
								<span className="text-xs text-muted-foreground">{`${course._count.chapters} Ders`}</span>
								<p className="w-1 h-1 rounded-full bg-slate-500 self-center"></p>
								<span className="text-xs text-muted-foreground">42 Saat</span>
							</div>
						</div>
						<div className="text-black/80 font-bold relative bottom-1">
							<span className="flex items-center gap-x-2">
								{formatProductPrice(course.price!)}
								<TagIcon
									strokeWidth={strokeWidth}
									className="w-5 h-5 text-teal-500"
								/>
							</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent side="top">
					<div className="flex flex-col justify-center px-2 w-[300px] gap-y-3 py-4">
						{course.courseLearningOutcome.length > 0 && (
							<>
								<div className="text-lg font-medium">Neler Öğreneceksiniz</div>

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
							</>
						)}
						<InstructorCard
							imageUrl={course.profile.imageUrl}
							instructor={course.profile.instructor}
						/>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SearchCourseCard;
