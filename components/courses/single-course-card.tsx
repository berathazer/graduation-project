import Image from "next/image";
import Link from "next/link";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import { CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import { formatProductPrice } from "@/lib/helpers";
import { SingleCourseTooltip } from "@/components/tooltips/single-course-tooltip";
import { Skeleton } from "../ui/skeleton";

const maxTitleLength = 50;

interface SingleCourseCardProps {
	course: CourseWithCategoryWithOutcomeWithFeature;
	profileId: string;
}

const SingleCourseCard = ({ course, profileId }: SingleCourseCardProps) => {
	
	return (
		<SingleCourseTooltip
			course={course}
			profileId={profileId}
		>
			<Link
				href={`/courses/${course.url}`}
				className="w-full flex flex-col gap-y-2 h-[288px]"
			>
				{/* Resim */}
				<div className="w-full flex-1 h-44 min-h-[176px] bg-slate-50 border relative">
					<Image
						alt={course.title}
						src={course.imageUrl || NodeJs}
						fill
						className="object-fill"
					/>
				</div>
				{/* Kurs ismi */}
				<p className="font-bold flex flex-col">
					{course.title.length > maxTitleLength
						? course.title.slice(0, maxTitleLength) + "..."
						: course.title}
					<span className="text-muted-foreground text-xs">{`(${course.category?.name})`}</span>
				</p>

				<p className="text-[12px] text-black/70">{course.instructor}</p>
				<p className="font-bold text-black/80">{formatProductPrice(course.price || 59)}</p>
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
