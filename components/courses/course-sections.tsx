import { strokeWidth } from "@/lib/constant";
import { convertChapterDuration, convertSecondsToMMSS } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { PlaySquare, Video } from "lucide-react";
import React from "react";
import { ScrollArea } from "../ui/scroll-area";

interface CourseSectionsProps {
	chapters: {
		title: string;
		description: string | null;
		duration: number;
		isFree: boolean;
		courseId: string;
	}[];
}

const CourseSections = async ({ chapters }: CourseSectionsProps) => {
	return (
		<div className=" flex flex-col gap-y-4">
			<h2 className="text-2xl font-bold">Kurs Bölümleri</h2>

			<div className="flex flex-col gap-y-1">
				<p className="text-sm text-muted-foreground">
					101 sections • 636 lectures • 57h 59m total length
				</p>
				<ScrollArea className="border-[1px] w-full bg-slate-100 flex flex-col max-h-[489px]">
					{chapters.map((chapter, index) => (
						<li
							key={index}
							className={cn(
								"flex items-center py-3 px-4 gap-x-2",
								chapters.length - 1 !== index && "border-b-[1px] border-slate-300"
							)}
						>
							<span>
								<PlaySquare
									className="w-6 h-6 text-muted-foreground"
									strokeWidth={strokeWidth}
								/>
							</span>
							<p className="ml-2 flex-1  flex items-center font-semibold gap-x-2">
								<span>{`${index + 1}-)`}</span>
								<span>{chapter.title}</span>
							</p>
							<span className="text-xs text-muted-foreground font-medium">
								{convertSecondsToMMSS(chapter.duration)}
							</span>
						</li>
					))}
				</ScrollArea>
			</div>
		</div>
	);
};

export const CourseSectionsSkeleton = () => {
	return <div>Loading...</div>;
};
export default CourseSections;
