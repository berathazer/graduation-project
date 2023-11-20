import { getBasket } from "@/actions/basket-action";

import AddBasketButton from "@/components/buttons/add-basket-button";
import AddFavoriteButton from "@/components/buttons/add-favorite-button";
import CourseComment from "@/components/courses/course-comment";
import CourseDescription from "@/components/courses/course-description";
import CourseInstructorProfile from "@/components/courses/course-instructor-profile";
import CourseRating from "@/components/courses/course-rating";
import CourseSections from "@/components/courses/course-sections";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getBasketFromCookies } from "@/lib/basket";

import db from "@/lib/db";
import { findFavoriteId } from "@/lib/favorites";
import { formatProductPrice } from "@/lib/helpers";

import Image from "next/image";
import React, { Suspense } from "react";

interface CourseUrlContainerProps {
	profileId: string;
	courseUrl: string;
}
const CourseUrlContainer = async ({ profileId, courseUrl }: CourseUrlContainerProps) => {
	const isAuthenticated = profileId != "";
	const course = await db.course.findUnique({
		where: {
			url: courseUrl,
		},
		include: {
			category: {
				select: {
					name: true,
					url: true,
				},
			},
			chapters: {
				select: {
					courseId: true,
					isFree: true,
					duration: true,
					title: true,
					description: true,
				},
				where: {},
			},
			courseFeature: {
				select: {
					difficulty: true,
					description: true,
					lifetimeAccess: true,
					resourceCount: true,
					shareLink: true,
				},
			},
			courseLearningOutcome: {
				select: {
					outcomeText: true,
				},
				orderBy: {
					order: "asc",
				},
			},
			profile: {
				select: {
					instructor: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
							headline: true,
						},
					},
					imageUrl: true,
				},
			},
			favorite: {
				where: {
					profileId: profileId,
				},
			},
		},
	});

	if (!course) {
		return <div>Kurs Bulunamadı</div>;
	}
	let basket: any[] | undefined = [];
	if (isAuthenticated) {
		basket = await getBasket(profileId);
	} else {
		basket = getBasketFromCookies();
	}

	const currentFavorite = course.favorite.find((f) => f.courseId === course.id);

	return (
		<div className="w-full ">
			<div className="container">
				<div
					key="1"
					className="grid gap-y-8 md:grid-cols-2 gap-6 lg:gap-8  max-w-7xl px-4 mx-auto py-16 "
				>
					<div className="col-span-2 lg:col-span-1 h-full flex flex-col gap-y-4">
						<div className="relative h-[300px] lg:h-[500px]">
							<Image
								alt={course?.title || ""}
								src={course?.imageUrl || ""}
								fill
								priority
								className="object-fill  w-full overflow-hidden dark:border-zinc-800 shadow rounded-md border-2 border-slate-50"
							/>
						</div>
						<CourseInstructorProfile
							courseInstructor={course.profile.instructor}
							imageUrl={course.profile.imageUrl}
						/>
						<CourseSections chapters={course.chapters} />
					</div>

					<div className="col-span-2 lg:col-span-1 flex flex-col gap-y-4">
						<h1 className="font-bold text-3xl">{course?.title}</h1>
						<div className="flex items-center ">
							<CourseRating rating={4.5} />
						</div>
						<div className="text-4xl font-bold">
							{formatProductPrice(course?.price || 0)}
						</div>
						<div className="flex gap-x-2">
							<AddBasketButton
								favoriteId={currentFavorite?.id || ""}
								courseId={course.id}
								basket={basket!}
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
							<CardHeader className="py-2 px-0">
								<CardTitle>Bu kurs şunları içeriyor:</CardTitle>
							</CardHeader>
							<CardContent className="px-2 pb-0">
								<ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
									<li>10 saat isteğe bağlı video</li>
									<li>42 indirilebilir kaynak</li>
									<li>Ömür boyu tam erişim</li>

									<li>Dersler hakkında kişiselleştirilmiş geri bildirim</li>
								</ul>
							</CardContent>
						</Card>

						<CourseDescription description={course.courseFeature?.description!} />
					</div>

					<div className="col-span-2 mt-6">
						<h2 className="font-bold text-2xl">Kurs Değerlendirmeleri</h2>
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
	);
};

export const CourseUrlContainerSkeleton = () => {
	return (
		<div className="container">
			<div
				key="1"
				className="grid gap-y-8 md:grid-cols-2 gap-6 lg:gap-8  max-w-7xl px-4 mx-auto py-16 "
			>
				<div className="col-span-2 lg:col-span-1 h-full ">
					<Skeleton className="relative h-[300px] lg:w-full lg:h-[600px]  animate-pulse" />
				</div>

				<div className="col-span-2 lg:col-span-1 grid gap-y-4">
					{/* Başlık Skeleton */}

					<div>
						<Skeleton className="h-6 w-full mb-4" />
						<Skeleton className="h-6 w-3/4  " />
					</div>

					{/* Rating Skeleton */}
					<Skeleton className="h-8 w-32  " />
					{/* Fiyat Skeleton */}
					<Skeleton className="h-8 w-40  " />

					{/* Butonlar Skeleton */}
					<div className="flex gap-x-2 w-full">
						<Skeleton className="h-10 flex-1" />
						<Skeleton className="h-10 w-16" />
					</div>

					{/* Açıklama Skeleton */}
					<Skeleton className="h-16 w-full mb-2" />

					{/* Kart İçeriği Skeleton */}
					<Card className="border-none bg-transparent px-0 shadow-none">
						<CardHeader className="py-6 px-0">
							<CardTitle>This course includes:</CardTitle>
						</CardHeader>
						<CardContent className="px-2">
							<ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-full" />
							</ul>
						</CardContent>
					</Card>

					{/* Instructor Bilgileri Skeleton */}
					<div className="hidden lg:block">
						<h3 className="font-bold text-lg">Course Instructor</h3>
						<div className="flex items-center mt-2">
							<Skeleton className=" w-10 h-10 rounded-full" />

							<div className="ml-4">
								{/* İsim Skeleton */}
								<Skeleton className="h-4 w-20 mb-1" />
								{/* Ünvan Skeleton */}
								<Skeleton className="h-3 w-16" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CourseUrlContainer;
