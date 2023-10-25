import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";

import React from "react";

//bu sayfada öğretmenin kursları getirilecek ve listelenecek.

const CoursesPage = async () => {
	const profile = await currentProfile();

	const courses = await db.course.findMany({
		where: {
			profileId: profile?.userId,
		},
	});

	console.log(courses);

	return (
		<div className="p-4">
			<pre>{JSON.stringify(courses, null, 4)}</pre>
		</div>
	);
};

export default CoursesPage;
