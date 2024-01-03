import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import Image from "next/image";
import { getPopularCourses } from "@/actions/courses-action";
import SingleCourseCard, { SingleCourseCardSkeleton } from "../courses/single-course-card";
import { currentProfile } from "@/lib/auth";
import { getPurchasedCoursesIds } from "@/lib/profile";

const PopularCourses = async () => {
	const [profile, courses] = await Promise.all([currentProfile(), getPopularCourses()]);
	const purchased = await getPurchasedCoursesIds(profile?.id!);
	const purchasedCourses = purchased.map((p) => p.courseId);

	return (
		<section
			id="popularCourses"
			className="px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24"
		>
			<p className="text-3xl font-bold text-muted-foreground">Popüler Kurslar</p>
			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
				{courses &&
					courses.map((course, i) => (
						<SingleCourseCard
							profileId={profile?.id || ""}
							key={i}
							course={course}
							isPurchased={purchasedCourses.includes(course.id)}
						/>
					))}
			</div>
		</section>
	);
};

export const PopularCoursesSkeleton = () => {
	return (
		<section
			id="popularCourses"
			className="px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24"
		>
			<p className="text-3xl font-bold text-muted-foreground">Popüler Kurslar</p>
			<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
				{Array.from({ length: 4 }).map((course, i) => (
					<SingleCourseCardSkeleton key={i} />
				))}
			</div>
		</section>
	);
};

export default PopularCourses;
