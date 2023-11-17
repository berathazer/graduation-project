import db from "@/lib/db";
import React from "react";

const InstructorIdPage = async ({ params }: { params: { instructorId: string } }) => {
	const instructor = await db.instructor.findUnique({
		where: {
			id: params.instructorId,
		},
		include: {
			profile: true,
			courses: true,
		},
	});

	return (
		<div>
			InstructorIdPage
			<pre>{JSON.stringify(instructor, null, 4)}</pre>
		</div>
	);
};

export default InstructorIdPage;
