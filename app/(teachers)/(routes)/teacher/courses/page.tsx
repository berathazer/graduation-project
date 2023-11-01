import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/auth";
import db from "@/lib/db";
import Link from "next/link";

import React from "react";

//bu sayfada öğretmenin kursları getirilecek ve listelenecek.

const CoursesPage = async () => {
	const profile = await currentProfile();

	const courses = await db.course.findMany({
		where: {
			profileId: profile?.id,
		},
		include: {
			category: true,
			chapters: true,
		},
	});

	return (
		<div className="p-4 flex flex-col justify-center">
			<div className="pb-4">
				<Link href={"/teacher/create"}>
					<Button className="">Yeni Kurs Ekle</Button>
				</Link>
			</div>
			<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						category={course.category?.name || ""}
						chaptersLength={course.chapters.length}
						id={course.id}
						imageUrl={course.imageUrl || ""}
						price={course.price || 0}
						title={course.title}
						url={course.url}
						progress={5}
						isPublished={course.isPublished}
					/>
				))}
			</div>
		</div>
	);
};

export default CoursesPage;
