import db from "@/lib/db";
import React from "react";

interface CourseIdPageProps {
	params: {
		courseId: string;
	};
}
const CourseIdPage = async ({ params }: CourseIdPageProps) => {
	const course = await db.course.findUnique({
		where: {
			id: params.courseId,
		},
	});

	return (
		<div>
			CourseIdPage
			<pre>{JSON.stringify(course, null, 4)}</pre>
		</div>
	);
};

export default CourseIdPage;
