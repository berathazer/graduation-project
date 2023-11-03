import Image from "next/image";
import Link from "next/link";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import { CourseWithCategory, CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import { formatProductPrice } from "@/lib/helpers";
import { SingleCourseTooltip } from "./single-course-tooltip";

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
				<div className="w-full flex-1 max-h-44 bg-slate-200 relative object-fill">
					<Image
						alt={course.title}
						src={course.imageUrl || NodeJs}
						fill
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

export default SingleCourseCard;
