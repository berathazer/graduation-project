import { CardDataTypes } from "@/containers/InstructorContainer";
import { strokeWidth } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface InstructorInfoCardProps {
	title: string;
	description: string;
	Icon: LucideIcon;
	type: CardDataTypes;
}

const InstructorInfoCard = ({ title, description, Icon, type }: InstructorInfoCardProps) => {
	return (
		<div className="flex flex-1  gap-x-2">
			<div className="w-40 relative flex items-center justify-center">
				{
					<Icon
						className={cn(
							"text-teal-500 w-32 h-32",
							type === "video" && "text-orange-500",
							type === "analytic" && "text-indigo-600"
						)}
						strokeWidth={strokeWidth}
					/>
				}
			</div>
			<div
				className={cn(
					"flex flex-1 flex-col justify-center gap-y-4 text-teal-600",
					type === "video" && "text-orange-600",
					type === "analytic" && "text-indigo-700"
				)}
			>
				<span className={cn(" text-lg font-medium")}>{title}</span>
				<p className="text-sm ">{description}</p>
			</div>
		</div>
	);
};

export default InstructorInfoCard;
