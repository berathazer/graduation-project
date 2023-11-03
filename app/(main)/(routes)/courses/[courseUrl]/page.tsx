import CourseComment from "@/components/courses/course-comment";
import CourseDescription from "@/components/courses/course-description";
import CourseRating from "@/components/courses/course-rating";
import CourseSections from "@/components/courses/course-sections";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import db from "@/lib/db";
import { formatProductPrice } from "@/lib/helpers";

import Image from "next/image";
import React from "react";

interface CourseIdPageProps {
	params: {
		courseUrl: string;
	};
}
const CourseIdPage = async ({ params }: CourseIdPageProps) => {
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
		},
	});

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
								<Button className="flex space-x-4 flex-1">Sepete Ekle</Button>
								<Button variant="outline">
									<svg
										className=" w-4 h-4"
										fill="none"
										height="24"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										viewBox="0 0 24 24"
										width="24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
									</svg>
								</Button>
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
