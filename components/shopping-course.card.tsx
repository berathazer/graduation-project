import { formatProductPrice } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Course } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface ShoppingCourseCardProps {
	course: Course;
	isLastItem?: boolean;
}

const maxTitleLength = 40;
const ShoppingCourseCard = ({ course, isLastItem }: ShoppingCourseCardProps) => {
	return (
		<div
			className={cn("w-[250px] flex  gap-x-2 flex-wrap pb-4 border-b", !isLastItem && "border-b")}
		>
			<div className="w-20 h-20 relative">
				<Image
					alt={course.title}
					src={course.imageUrl!}
					fill
					className="object-cover"
				/>
			</div>
			<div className="flex flex-col flex-1 gap-y-1 text-start relative bottom-1">
				<p className="font-medium text-sm ">{course.title.slice(0, maxTitleLength) + " ..."}</p>
				<div className="flex flex-col gap-y-1">
					<p className="text-xs font font-light text-muted-foreground">
						{course.instructor.slice(0, maxTitleLength)}
					</p>
					<p className="font-bold text-xs">{formatProductPrice(course.price!)}</p>
				</div>
			</div>
		</div>
	);
};

export default ShoppingCourseCard;
