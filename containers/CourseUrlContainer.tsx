import { getBasket } from "@/actions/basket-action";

import AddBasketButton from "@/components/buttons/add-basket-button";
import AddFavoriteButton from "@/components/buttons/add-favorite-button";
import CourseComment from "@/components/courses/course-comment";
import CourseDescription from "@/components/courses/course-description";
import CourseInstructorProfile from "@/components/courses/course-instructor-profile";
import CourseRating from "@/components/courses/course-rating";
import CourseSections from "@/components/courses/course-sections";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { getBasketFromCookies } from "@/lib/basket";

import db from "@/lib/db";
import { findFavoriteId } from "@/lib/favorites";
import { formatProductPrice } from "@/lib/helpers";
import { getPurchasedCoursesIds } from "@/lib/profile";
import { Rating } from "@smastrom/react-rating";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseUrlContainerProps {
	profileId: string;
	courseUrl: string;
}
const CourseUrlContainer = async ({ profileId, courseUrl }: CourseUrlContainerProps) => {
	const isAuthenticated = profileId != "";
	const getCourse = db.course.findUnique({
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
				where: { isPublished: true },
				orderBy: {
					position: "asc",
				},
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
							createdAt: true,
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
			reviews: {
				select: {
					rating: true,
				},
			},
		},
	});

	const [course, purchased] = await Promise.all([getCourse, getPurchasedCoursesIds(profileId)]);

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

	const purchasedCourses = purchased.map((p) => p.courseId);
	const isPurchased = purchasedCourses.includes(course.id);

	const totalRating = course.reviews.reduce((sum, vote) => sum + vote.rating, 0);

	const averageRating = totalRating / course.reviews.length;

	return (
		<div className="w-full ">
			<div
				key="1"
				className="grid gap-y-8 md:grid-cols-2 gap-4 lg:gap-4  max-w-7xl px-4 mx-auto py-16 "
			>
				<div className="col-span-2  h-full flex flex-col gap-y-4 md:flex-row  md:gap-x-6">
					<div className="relative h-[300px] lg:h-[500px] md:flex-1 ">
						<Image
							alt={course?.title || ""}
							src={course?.imageUrl || ""}
							fill
							priority
							className="object-fill  w-full overflow-hidden dark:border-zinc-800 shadow rounded-md border-2 border-slate-50"
						/>
					</div>
					<div className="flex flex-col gap-y-4 flex-1">
						<h1 className="font-bold text-3xl">{course?.title}</h1>
						<div className="flex items-center gap-x-2">
							<Rating
								value={!totalRating ? 0 : averageRating}
								readOnly
								orientation="horizontal"
								style={{ maxWidth: 120 }}
							/>
							<span className="text-muted-foreground">{averageRating} oy oranı</span>
						</div>
						<div className="text-4xl font-bold">
							{formatProductPrice(course?.price || 0)}
						</div>
						<div className="flex gap-x-2">
							{!isPurchased && (
								<>
									{" "}
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
								</>
							)}
							{isPurchased && (
								<Link
									href={"/my-courses"}
									className="w-full"
								>
									<Button className="w-full">Kursa Git</Button>
								</Link>
							)}
						</div>
						<p className="mt-4  text-gray-500">{course?.description}</p>
						<div className="flex w-full items-center gap-x-4 ">
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
							<CourseInstructorProfile
								courseInstructor={course.profile.instructor}
								imageUrl={course.profile.imageUrl}
								className="flex md:hidden h-full"
							/>
						</div>
					</div>
				</div>
				<div className="col-span-2 hidden md:flex">
					<CourseInstructorProfile
						courseInstructor={course.profile.instructor}
						imageUrl={course.profile.imageUrl}
					/>
				</div>
				<div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
					<div className="col-span-2 md:col-span-1">
						<CourseSections chapters={course.chapters} />
					</div>
					<div className="col-span-2 md:col-span-1">
						<CourseDescription description={course.courseFeature?.description!} />
					</div>
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
							<CardTitle>Bu kurs şunları içeriyor:</CardTitle>
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
				</div>
			</div>
		</div>
	);
};
export default CourseUrlContainer;
