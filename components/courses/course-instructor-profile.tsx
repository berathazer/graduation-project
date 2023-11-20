import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

import { Skeleton } from "../ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarDays } from "lucide-react";
import { formatJoinDate } from "@/lib/helpers";
import { cn } from "@/lib/utils";

interface CourseInstructorProfileProps {
	courseInstructor: {
		id: string;
		firstName: string;
		lastName: string;
		headline: string;
		createdAt: Date;
	} | null;
	imageUrl: string;
	className?: string;
}

const CourseInstructorProfile = ({
	courseInstructor,
	imageUrl,
	className,
}: CourseInstructorProfileProps) => {
	const fullName = courseInstructor?.firstName + " " + courseInstructor?.lastName;
	return (
		<div className={cn("flex flex-col", className)}>
			<TooltipProvider delayDuration={50}>
				<Tooltip>
					<TooltipTrigger asChild>
						<Link
							href={`/instructor/${courseInstructor?.id}`}
							className="w-80 h-full p-4 rounded-lg border hover:bg-muted transition-colors "
						>
							<div className="flex ">
								<div className="flex justify-between space-x-4">
									<Avatar>
										<AvatarImage src={imageUrl || ""} />
										<AvatarFallback>B</AvatarFallback>
									</Avatar>
									<div className="space-y-1">
										<h4 className="text-sm font-bold">{fullName}</h4>
										<p className="text-sm font-medium">
											{courseInstructor?.headline}
										</p>
										<div className="flex items-center pt-2">
											<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
											<span className="text-xs text-muted-foreground">
												{formatJoinDate(courseInstructor?.createdAt!)}
											</span>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</TooltipTrigger>
					<TooltipContent
						side="right"
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
