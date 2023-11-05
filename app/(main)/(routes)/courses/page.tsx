import db from "@/lib/db";

import React from "react";

import CourseCategories from "@/components/course-categories";

import { CourseWithCategoryWithOutcomeWithFeature } from "@/types/global.types";
import SingleCourseCard from "@/components/courses/single-course-card";
import { currentProfile } from "@/lib/auth";

interface CoursesPageProps {
	searchParams: {
		categoryId: string;
	};
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
	const categoryId = searchParams.categoryId;

	const getCategories = db.category.findMany({
		where: {
			parentId: {
				equals: null,
			},
		},
	});
	const getProfile = currentProfile();

	const [categories, profile] = await Promise.all([getCategories, getProfile]);

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
				categoryId: searchParams.categoryId,
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

	
	//search parametresindeki categoryiyi alan kod
	const category = categories.filter((c) => c.id === categoryId);

	return (
		<div className="p-6 flex flex-col gap-y-16">
			<CourseCategories categories={categories} />
			{courses.length === 0 && (
				<div className="w-full text-center font-medium text-2xl text-muted-foreground">
					Hiç Kurs Bulunamadı.
				</div>
			)}
			{courses.length > 0 && (
				<div className="flex flex-col gap-y-4">
					<p className="flex items-center justify-center font-medium text-3xl text-muted-foreground">
						{category.length > 0 ? category[0].name : "Tüm Kategoriler"}
					</p>
					<div className="px-4 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-12">
						<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-4 place-items-center gap-y-8 gap-x-5">
							{courses.map((course, i) => (
								<SingleCourseCard
									profileId={profile?.id as string}
									key={i}
									course={course}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CoursesPage;
