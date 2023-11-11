import { getBasket } from "@/actions/basket-action";
import { getFavorites } from "@/actions/favorites-action";
import AddBasketButton from "@/components/buttons/add-basket-button";
import AddFavoriteButton from "@/components/buttons/add-favorite-button";
import CourseComment from "@/components/courses/course-comment";
import CourseDescription from "@/components/courses/course-description";
import CourseRating from "@/components/courses/course-rating";
import CourseSections from "@/components/courses/course-sections";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentProfile } from "@/lib/auth";
import { getBasketFromCookies } from "@/lib/basket";

import db from "@/lib/db";
import { findFavoriteId } from "@/lib/favorites";
import { formatProductPrice } from "@/lib/helpers";

import Image from "next/image";
import React from "react";

interface CourseIdPageProps {
	params: {
		courseUrl: string;
	};
}
const CourseIdPage = async ({ params }: CourseIdPageProps) => {
	const profile = await currentProfile();
	const isAuthenticated = profile != null;
	const course = await db.course.findUnique({
		where: {
			url: params.courseUrl,
		},
		include: {
			category: true,
			chapters: {
				include: {
					muxData: true,
				},
			},
			courseFeature: true,
			courseLearningOutcome: true,
			profile: true,
			favorite: {
				where: {
					profileId: profile?.id,
				},
			},
			basket: true,
		},
	});

	if (!course) {
		return <div>Kurs Bulunamadı</div>;
	}
	let basket: any[] | undefined = [];
	if (isAuthenticated) {
		basket = await getBasket(profile.id);
	} else {
		basket = getBasketFromCookies();
	}

	const currentFavorite = course.favorite.find((f) => f.courseId === course.id);

	return (
		<div className="">
			<div className="w-full bg-slate-50 ">
				<div className="container">
					<div
						key="1"
						className="grid gap-y-8 md:grid-cols-2 gap-6 lg:gap-8  max-w-7xl px-4 mx-auto py-16 "
					>
						<div className="col-span-2 lg:col-span-1 h-full ">
							<div className="relative  h-[300px] lg:w-full lg:h-[600px] ">
								<Image
									alt={course?.title || ""}
									src={course?.imageUrl || ""}
									fill
									className="aspect-square object-cover border border-zinc-200 w-full overflow-hidden dark:border-zinc-800 shadow"
								/>
							</div>
						</div>

						<div className="col-span-2 lg:col-span-1 grid gap-4">
							<h1 className="font-bold text-3xl">{course?.title}</h1>
							<div className="flex items-center gap-4">
								<CourseRating rating={4.5} />
							</div>
							<div className="text-4xl font-bold">
								{formatProductPrice(course?.price || 0)}
							</div>
							<div className="flex gap-x-2">
								<AddBasketButton
									favoriteId={currentFavorite?.id!}
									isFavorite={currentFavorite != null}
									courseId={course.id}
									basket={course.basket}
									className="rounded-sm flex-1"
								/>
								<AddFavoriteButton
									courseId={course?.id as string}
									basket={basket!}
									isFavorite={currentFavorite != null}
									favoriteId={findFavoriteId(course!.favorite, course.id)?.id}
									className="px-3"
									variant={"outline"}
								/>
							</div>
							<p className="mt-4  text-gray-500">{course?.description}</p>
							<Card className="border-none bg-transparent px-0 shadow-none">
								<CardHeader className="py-6 px-0">
									<CardTitle>This course includes:</CardTitle>
								</CardHeader>
								<CardContent className="px-2">
									<ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
										<li>10 hours of on-demand video</li>
										<li>8 articles</li>
										<li>42 downloadable resources</li>
										<li>Full lifetime access</li>
										<li>Certificate of completion</li>
										<li>
											Direct interaction with the instructor through live chat
											sessions
										</li>
										<li>Personalized feedback on assignments</li>
									</ul>
								</CardContent>
							</Card>
							<div className="hidden lg:block">
								<h3 className="font-bold text-lg">Course Instructor</h3>
								<div className="flex items-center mt-2">
									<div className="w-10 h-10 relative">
										<Image
											src={course?.profile.imageUrl || ""}
											alt={course?.profile.name || ""}
											fill
											className="rounded-full"
											style={{
												aspectRatio: "40/40",
												objectFit: "cover",
											}}
										/>
									</div>

									<div className="ml-4">
										<h4 className="font-bold">John Doe</h4>
										<p className="text-sm text-gray-500">Professional Instructor</p>
									</div>
								</div>
							</div>
						</div>
						<CourseSections />
						<CourseDescription courseFeature={course?.courseFeature} />
						<div className="col-span-2 mt-6">
							<h2 className="font-bold text-2xl">Course Reviews</h2>
							<div className="mt-2 space-y-4">
								<CourseComment />
								<CourseComment />
								<CourseComment />
							</div>
						</div>

						<div className="col-span-2 mt-6">Random Courses Slider</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseIdPage;
