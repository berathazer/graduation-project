import Link from "next/link";
import React from "react";
import { CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import { formatProductPrice } from "@/lib/helpers";
import { SingleCourseTooltip } from "@/components/tooltips/single-course-tooltip";
import { Skeleton } from "../ui/skeleton";

import LoadingImage from "./loading-image";
import { IconBadge } from "../icon-badge";
import { BookOpen } from "lucide-react";

const maxTitleLength = 48;

interface SingleCourseCardProps {
	course: CourseWithCategoryWithOutcomeWithFeature;
	profileId: string;
}

const SingleCourseCard = ({ course, profileId }: SingleCourseCardProps) => {
	const chaptersLength = course.chapters.length;
	return (
		<SingleCourseTooltip
			course={course}
			profileId={profileId}
		>
			<Link
				href={`/courses/${course.url}`}
				className="w-full  p-2 rounded-lg border flex flex-col gap-y-2 min-h-[358px]"
			>
				<LoadingImage
					title={course.title}
					imageUrl={course.imageUrl || ""}
					className="h-[199px] flex-grow-0 flex-shrink-0 flex-none"
				/>

				<div className="flex flex-col gap-y-2 px-1 py1 flex-1">
					<p className="font-bold flex flex-col">
						{course.title.length > maxTitleLength
							? course.title.slice(0, maxTitleLength) + "..."
							: course.title}
						<span className="text-muted-foreground text-xs">{`(${course.category?.name})`}</span>
					</p>

					<p className="text-[12px] text-black/70">{course.instructor}</p>
					<div className="flex mt-auto justify-between font-bold text-black/80">
						<div className="flex items-center gap-x-1 text-slate-500 text-xs font-light">
							<IconBadge
								size="sm"
								icon={BookOpen}
							/>
							<span>Toplam {chaptersLength} Bölüm</span>
						</div>
						<span>{formatProductPrice(course.price || 59)}</span>
					</div>
				</div>
			</Link>
		</SingleCourseTooltip>
	);
};
export const SingleCourseCardSkeleton = () => {
	return (
		<div className="w-full flex flex-col gap-y-2 h-[288px]">
			{/* Resim Skeleton */}
			<div className="w-full flex-1 h-44 min-h-[176px] bg-gray-300 border relative">
				<Skeleton className="object-fill" />
			</div>

			{/* Kurs İsmi Skeleton */}
			<div className="flex flex-col">
				<Skeleton className="h-4 w-3/4 mb-1" />
				<Skeleton className="h-3 w-1/2" />
			</div>

			{/* Diğer Bilgiler Skeleton */}
			<Skeleton className="h-2 w-1/3" />
			<Skeleton className="h-2 w-1/4 mb-1" />
			<Skeleton className="h-4 w-1/3" />
		</div>
	);
};

export default SingleCourseCard;
