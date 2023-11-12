import db from "@/lib/db";

import React from "react";

import { CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import SingleCourseCard from "@/components/courses/single-course-card";

import PageWrapper from "@/containers/PageWrapper";
import { Category } from "@prisma/client";

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
				courseFeature: true,
				favorite: true,
				basket: true,
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
				courseFeature: true,
				favorite: true,
				basket: true,
			},
		});
	}

	return (
		<div className="">
			<PageWrapper>
				{courses.length === 0 && (
					<div className="w-full text-center font-medium text-2xl text-muted-foreground">
						Hiç Kurs Bulunamadı.
					</div>
				)}
				{courses.length > 0 && (
					<div className="flex flex-col gap-y-8">
						<p className="flex items-center justify-center font-medium text-3xl text-muted-foreground">
							{category != null ? category.name : "Tüm Kategoriler"}
						</p>

						<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 place-items-center gap-y-8 gap-x-5">
							{courses.map((course, i) => (
								<SingleCourseCard
									profileId={profileId || ""}
									key={i}
									course={course}
								/>
							))}
						</div>
					</div>
				)}
			</PageWrapper>
		</div>
	);
};

export default CoursesContainer;
