import db from "@/lib/db";
import Link from "next/link";
import React from "react";

const CoursesPage = async () => {
	const courses = await db.course.findMany();

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 text-sm p-8">
			{courses.map((course) => (
				<Link
					key={course.id}
					href={"/courses/" + course.id}
				>
					<pre key={course.id}>{JSON.stringify(course, null, 4)}</pre>
				</Link>
			))}
		</div>
	);
};

export default CoursesPage;
