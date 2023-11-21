import React from "react";

import CourseRating from "../courses/course-rating";
import { formatProductPrice } from "@/lib/helpers";
import { TagIcon } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { Course } from "@prisma/client";
import LoadingImage from "../courses/loading-image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchCourseCardProps {
	course: Course & {
		_count: {
			chapters: number;
		};
	};
}
const SearchCourseCard = ({ course }: SearchCourseCardProps) => {
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
							<p className="text-sm font-medium">{course.description}</p>
							<span className="text-xs text-muted-foreground">{`(${course.instructor})`}</span>
							<CourseRating
								color="orange"
								rating={4}
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
								{formatProductPrice(1299)}{" "}
								<TagIcon
									strokeWidth={strokeWidth}
									className="w-5 h-5 text-teal-500"
								/>
							</span>
						</div>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					<div className="w-full h-20 bg-slate-50 border">A</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default SearchCourseCard;
