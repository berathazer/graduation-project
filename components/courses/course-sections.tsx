import db from "@/lib/db";

import React from "react";

interface CourseSectionsProps {
	courseId: string;
}

const CourseSections = async ({ courseId }: CourseSectionsProps) => {
	const chapters = await db.chapter.findMany({
		where: {
			courseId,
		},
		include: {
			muxData: true,
		},
	});
	return (
		<div className="col-span-2 md:col-span-1">
			CourseSections
			<pre className="text-xs">{JSON.stringify(chapters, null, 4)}</pre>
		</div>
	);
};

export const CourseSectionsSkeleton = () => {
	return <div>Loading...</div>;
};
export default CourseSections;
