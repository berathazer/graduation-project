import { strokeWidth } from "@/lib/constant";
import { convertChapterDuration, convertSecondsToMMSS } from "@/lib/helpers";
import { Video } from "lucide-react";
import React from "react";

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
				<ul className="border w-full bg-slate-100 flex flex-col">
					{chapters.map((chapter, index) => (
						<li
							key={index}
							className="flex items-center py-3 px-4 gap-x-2"
						>
							<span>
								<Video
									className="w-4 h-4"
									strokeWidth={strokeWidth}
								/>
							</span>
							<p className="ml-2 flex-1  flex items-center font-bold">{chapter.title}</p>
							<span className="text-xs text-muted-foreground font-medium">
								{convertSecondsToMMSS(chapter.duration)}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export const CourseSectionsSkeleton = () => {
	return <div>Loading...</div>;
};
export default CourseSections;
