import React from "react";
import Preview from "../preview";

import { ScrollArea } from "../ui/scroll-area";
import db from "@/lib/db";
import { Skeleton } from "../ui/skeleton";

interface CourseDescriptionProps {
	courseId: string;
}
const CourseDescription = async ({ courseId }: CourseDescriptionProps) => {
	const courseFeature = await db.courseFeature.findFirst({
		where: {
			courseId,
		},
	});
	return (
		<div className="col-span-2 md:col-span-1 mt-4">
			<ScrollArea className="w-full h-[500px]">
				<h2 className="font-bold text-2xl text-center ">Kurs Açıklaması</h2>
				<Preview
					value={courseFeature?.description || ""}
					className="text-lg font-medium"
				/>

				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-900" />
			</ScrollArea>
		</div>
	);
};

export const CourseDescriptionSkeleton = () => {
	return (
		<div className="col-span-2 md:col-span-1 mt-4">
			<Skeleton className="w-full h-[500px] relative">
				<Skeleton className="font-bold text-2xl text-center mb-4" />
				<Skeleton className="text-lg font-medium" />

				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-900">
					<Skeleton className="h-full" />
				</div>
			</Skeleton>
		</div>
	);
};

export default CourseDescription;
