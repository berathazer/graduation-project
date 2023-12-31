import { getProgress } from "@/actions/get-progress";
import { getReview } from "@/actions/review-action";
import { CourseProgress } from "@/components/course-progress";
import LoadingImage from "@/components/courses/loading-image";
import RateDialog from "@/components/rate-dialog";

import { Course } from "@prisma/client";
import { Play } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MyCourseCardProps {
	course: Course;
	profileId?: string;
}
const MyCourseCard = async ({ course, profileId }: MyCourseCardProps) => {
	const [progressCount, review] = await Promise.all([
		getProgress(profileId || "", course.id),
		getReview(profileId || "", course.id),
	]);

	return (
		<div className="h-full flex flex-col gap-y-2">
			<div className="relative group">
				<LoadingImage
					title={course.title}
					imageUrl={course.imageUrl!}
					className="w-full h-52 rounded-none border-none aspect-video "
				/>
				<div className="group-hover:absolute inset-0 hidden group-hover:flex  w-full h-full bg-black group-hover:opacity-60 cursor-pointer" />

				<Link
					href={`/learning/${course.id}`}
					className="hidden group-hover:flex items-center justify-center absolute inset-0"
				>
					<span className="rounded-full p-3 bg-white flex items-center justify-center">
						<Play
							strokeWidth={1.2}
							className="w-8 h-8 text-black relative left-[2px]"
						/>
					</span>
				</Link>
			</div>
			<div className="flex flex-col gap-y-1 text-sm mb-4">
				<p>{course.title}</p>
				<span className="text-muted-foreground">{course.instructor}</span>
			</div>
			<div className="mt-auto">
				<CourseProgress value={progressCount} />
			</div>
			<RateDialog
				initialData={review}
				courseId={course.id}
				profileId={profileId}
			/>
		</div>
	);
};

export default MyCourseCard;
