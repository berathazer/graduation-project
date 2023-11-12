import { Chapter } from "@prisma/client";
import React from "react";

interface CourseSectionsProps {
	chapters: Chapter[];
}

const CourseSections = ({ chapters }: CourseSectionsProps) => {
	return (
		<div className="col-span-2 md:col-span-1">
			CourseSections
			<pre>{JSON.stringify(chapters, null, 4)}</pre>
		</div>
	);
};

export default CourseSections;
