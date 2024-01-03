import db from "@/lib/db";

import React from "react";

import { CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import SingleCourseCard from "@/components/courses/single-course-card";

import PageWrapper from "@/containers/PageWrapper";
import { Category } from "@prisma/client";
import { getPurchasedCoursesIds } from "@/lib/profile";

interface CoursesContainerProps {
	categoryId?: string;
	category: Category;
	profileId?: string;
}

const CoursesContainer = async ({ categoryId, category, profileId }: CoursesContainerProps) => {
	let courses: CourseWithCategoryWithOutcomeWithFeature[];

	if (!categoryId) {
		courses = await db.course.findMany({
			where: {
				isPublished: true,
			},
			include: {
				category: true,
				courseLearningOutcome: {
					orderBy: {
						order: "asc",
					},
				},
				chapters: {
					where: {
						isPublished: true,
					},
				},
				courseFeature: true,
				favorite: true,
				basket: true,
				reviews: {
					select: {
						rating: true,
					},
				},
			},
		});
	} else {
		courses = await db.course.findMany({
			where: {
				categoryId: categoryId,
				isPublished: true,
			},
			include: {
				category: true,
				courseLearningOutcome: {
					orderBy: {
						order: "asc",
					},
				},
				chapters: {
					where: {
						isPublished: true,
					},
				},
				courseFeature: true,
				favorite: true,
				basket: true,
				reviews: {
					select: {
						rating: true,
					},
				},
			},
		});
	}

	const purchased = await getPurchasedCoursesIds(profileId!);
	const purchasedCourses = purchased.map((p) => p.courseId);

	return (
		<PageWrapper>
			{courses.length === 0 && (
				<div className="w-full pt-8 text-center font-medium text-2xl text-muted-foreground">
					Hiç Kurs Bulunamadı.
				</div>
			)}
			{courses.length > 0 && (
				<div className="flex flex-col gap-y-8 pt-8">
					<p className="flex items-center justify-center font-medium text-3xl text-muted-foreground">
						{category != null ? category.name : "Tüm Kategoriler"}
					</p>

					<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 place-items-center gap-y-8 gap-x-5">
						{courses.map((course, i) => (
							<SingleCourseCard
								profileId={profileId || ""}
								key={i}
								course={course}
								isPurchased={purchasedCourses.includes(course.id)}
							/>
						))}
					</div>
				</div>
			)}
		</PageWrapper>
	);
};

export default CoursesContainer;
