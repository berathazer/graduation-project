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
	});

	return (
		<div className="p-8">
			{!course && <div>Aradığınız Kurs Bulunamadı.</div>}
			{course && <pre>{JSON.stringify(course, null, 4)}</pre>}
		</div>
	);
};

export default CourseIdPage;
