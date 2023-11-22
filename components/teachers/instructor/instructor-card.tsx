import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatJoinDate } from "@/lib/helpers";
import { Instructor } from "@prisma/client";
import { CalendarDays } from "lucide-react";
import React from "react";

interface InstructorCardProps {
	instructor: Instructor | null;
	imageUrl: string;
}
const InstructorCard = ({ imageUrl, instructor }: InstructorCardProps) => {
	const fullName = instructor?.firstName + " " + instructor?.lastName;
	return (
		<div className="flex border rounded-md w-full gap-x-2 p-2">
			<div>
				<Avatar className="w-12 h-12">
					<AvatarImage
						src={imageUrl}
						alt={fullName}
					/>
					<AvatarFallback>B</AvatarFallback>
				</Avatar>
			</div>
			<div className="flex flex-col ">
				<p className="font-bold">{fullName}</p>
				<p>{instructor?.headline}</p>
				<div className="flex items-center pt-2">
					<CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
					<span className="text-xs text-muted-foreground">
						{formatJoinDate(instructor?.createdAt!)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default InstructorCard;
