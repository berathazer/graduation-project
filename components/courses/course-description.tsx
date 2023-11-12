"use client";
import React, { useState } from "react";
import Preview from "../preview";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { CourseFeature } from "@prisma/client";

interface CourseDescriptionProps {
	courseFeature: CourseFeature | undefined | null;
}
const CourseDescription = ({ courseFeature }: CourseDescriptionProps) => {
	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => {
		setShowMore(!showMore);
	};

	return (
		<div className="col-span-2 md:col-span-1">
			{/* <h2 className="font-bold text-2xl">Course Description</h2>
			 */}
			<Preview
				value={
					(showMore
						? courseFeature?.description
						: courseFeature?.description?.slice(0, 700)) || ""
				}
				className="text-lg font-medium"
			/>
			{!showMore && (
				<Button
					className="text-purple-600"
					variant={"showMore"}
					onClick={toggleShowMore}
				>
					Daha Fazla Göster
					<ChevronDown
						className="w-4 h-4"
						strokeWidth={strokeWidth}
					/>
				</Button>
			)}

			{showMore && (
				<Button
					className="text-purple-600"
					variant={"showMore"}
					onClick={toggleShowMore}
				>
					Daha Az Göster
					<ChevronUp
						className="w-4 h-4"
						strokeWidth={strokeWidth}
					/>
				</Button>
			)}
		</div>
	);
};

export default CourseDescription;
