"use client";
import React, { useState } from "react";
import Preview from "../preview";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { CourseFeature } from "@prisma/client";
import { ScrollArea } from "../ui/scroll-area";

interface CourseDescriptionProps {
	courseFeature: CourseFeature | undefined | null;
}
const CourseDescription = ({ courseFeature }: CourseDescriptionProps) => {
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

export default CourseDescription;
