import db from "@/lib/db";
import React from "react";

interface CourseIdPageProps {
	params: {
		courseUrl: string;
	};
}
const CourseIdPage = async ({ params }: CourseIdPageProps) => {
	const course = await db.course.findUnique({
		where: {
			url: params.courseUrl,
		},
		include: {
			category: true,
			chapters: {
				include: {
					muxData: true,
				},
			},
			courseFeature: true,
			courseLearningOutcome: true,
		},
	});

	return (
		<div className="p-8 text-sm">
			{!course && <div>Aradığınız Kurs Bulunamadı.</div>}
			{course && (
				<>
					<pre>{JSON.stringify(course, null, 4)}</pre>
				</>
			)}
		</div>
	);
};

export default CourseIdPage;
