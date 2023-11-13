import db from "@/lib/db";

import { currentProfile } from "@/lib/auth";
import CoursesContainer from "@/containers/CoursesContainer";
import { Suspense } from "react";
import CoursesSkeleton from "@/skeletons/CoursesSkeleton";
import PageWrapper from "@/containers/PageWrapper";
import CourseCategories from "@/components/course-categories";

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

	const [category] = categories.filter((c) => c.id === categoryId);

	return (
		<Suspense fallback={<CoursesSkeleton />}>
			<div>
				<PageWrapper>
					<CourseCategories categories={categories} />
				</PageWrapper>
			</div>
			<CoursesContainer
				categoryId={categoryId}
				category={category}
				profileId={profile?.id}
			/>
		</Suspense>
	);
};

export default CoursesPage;
