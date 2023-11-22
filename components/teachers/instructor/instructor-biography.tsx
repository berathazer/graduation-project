"use client";
import Preview from "@/components/preview";
import { Button } from "@/components/ui/button";
import { strokeWidth } from "@/lib/constant";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface InstructorBiographyProps {
	biography: string;
}
const InstructorBiography = ({ biography }: InstructorBiographyProps) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className="flex flex-col pt-6">
			<h2 className="font-bold pb-4">Hakkımda</h2>
			<div className="relative right-[14px]">
				<Preview value={showMore ? biography : biography.slice(0, 600)} />
				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-900" />
			</div>
			<Button
				variant={"showMore"}
				className="text-purple-600 w-max flex items-center gap-x-2"
				onClick={() => setShowMore(!showMore)}
			>
				{showMore ? "Gizle" : "Daha fazla göster"}{" "}
				{showMore ? (
					<ChevronUp
						strokeWidth={strokeWidth}
						className="w-4 h-4"
					/>
				) : (
					<ChevronDown
						strokeWidth={strokeWidth}
						className="w-4 h-4"
					/>
				)}
			</Button>
		</div>
	);
};

export default InstructorBiography;
