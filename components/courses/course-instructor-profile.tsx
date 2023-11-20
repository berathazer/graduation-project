import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import db from "@/lib/db";
import { Skeleton } from "../ui/skeleton";

interface CourseInstructorProfileProps {
	profileId: string;
}
const CourseInstructorProfile = async ({ profileId }: CourseInstructorProfileProps) => {
	const courseInstructor = await db.instructor.findFirst({
		where: {
			profileId,
		},
		include: {
			profile: true,
		},
	});

	const fullName = courseInstructor?.firstName + " " + courseInstructor?.lastName;
	return (
		<div className="flex flex-col">
			<h3 className="font-bold text-lg">Kurs Eğitmeni</h3>
			<TooltipProvider delayDuration={50}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={`/instructor/${courseInstructor?.id}`}
							className="w-max h-full"
						>
							<Button
								variant={"ghost"}
								className="flex items-center h-full"
							>
								<div className="w-10 h-10 relative">
									<Image
										src={courseInstructor?.profile.imageUrl || ""}
										alt={fullName || ""}
										fill
										className="rounded-full"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
									/>
								</div>

								<div className="ml-4">
									<h4 className="font-bold text-start">{fullName}</h4>
									<p className="text-sm text-gray-500">{courseInstructor?.headline}</p>
								</div>
							</Button>
						</Link>
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						className="rounded-md "
					>
						<div className="flex items-center p-1 ">Profili Görüntüle</div>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export const CourseInstructorProfileSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-2 mt-2">
			<h3 className="font-bold text-lg">
				<Skeleton className="w-20 h-5" />
			</h3>
			<div className="w-max h-full flex items-center">
				<Skeleton className="w-10 h-10 rounded-full" />
				<div className="ml-4 flex flex-col gap-y-2">
					<h4 className="font-bold text-start">
						<Skeleton className="w-60 h-11" />
					</h4>
				</div>
			</div>
		</div>
	);
};

export default CourseInstructorProfile;
