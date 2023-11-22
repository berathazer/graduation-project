import SingleCourseCard from "@/components/courses/single-course-card";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import InstructorBiography from "@/components/teachers/instructor/instructor-biography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageWrapper from "@/containers/PageWrapper";
import db from "@/lib/db";
import { instructorNavigations } from "@/lib/navigations";

import React, { Suspense } from "react";

const InstructorIdContainer = async ({ instructorId }: { instructorId: string }) => {
	const instructor = await db.instructor.findUnique({
		where: {
			id: instructorId,
		},
		include: {
			profile: true,
			courses: {
				include: {
					category: true,
					courseLearningOutcome: {
						orderBy: {
							order: "asc",
						},
					},
					chapters: true,
					courseFeature: true,
					favorite: true,
					basket: true,
					_count: {
						select: {
							reviews: true,
							purchase: true,
						},
					},
				},
			},
		},
	});

	const totalReviews = instructor?.courses.reduce((acc, course) => acc + course._count.reviews, 0);
	const totalPurchases = instructor?.courses.reduce((acc, course) => acc + course._count.purchase, 0);

	const fullName = instructor?.firstName + " " + instructor?.lastName;
	return (
		<PageWrapper>
			<NavigationBreadcrumb
				title={"Eğitmen"}
				navigations={instructorNavigations}
			/>
			<div className="grid grid-cols-4 lg:px-12 lg:container gap-x-4">
				{/* Left Side */}
				<div className="col-span-3 flex flex-col">
					<div className="flex flex-col">
						<p
							className="text-xs text-muted-foreground uppercase
						 font-bold"
						>
							EĞİtmen
						</p>
						<div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-400 tracking-wider">
							{fullName}
						</div>
						<p className="py-3 font-bold text-black/80">{instructor?.headline}</p>
						<div className="flex items-center gap-x-6">
							<div className="flex flex-col gap-y-1">
								<span className="text-xs tracking-tighter font-bold text-muted-foreground">
									Toplam öğrenci sayısı
								</span>
								<p className="text-xl font-bold">{totalPurchases}</p>
							</div>

							<div className="flex flex-col gap-y-1">
								<span className="text-xs tracking-tighter font-bold text-muted-foreground">
									Yorumlar
								</span>
								<p className="text-xl font-bold">{totalReviews}</p>
							</div>
						</div>
					</div>
					{/* Bio */}
					<Suspense fallback={<div>loading...</div>}>
						<InstructorBiography biography={instructor?.biography!} />
					</Suspense>

					{/* Kurslarım */}
					<div className="grid grid-cols-2 pt-6 gap-x-4">
						<p className="font-bold col-span-2 flex items-center gap-x-1 pb-6">
							<span>Kurslarım</span>
							<span>{`(${instructor?.courses.length})`}</span>
						</p>
						{instructor?.courses.map((course) => (
							<div
								className="grid-cols-1"
								key={course.id}
							>
								<SingleCourseCard
									profileId={instructor.profileId || ""}
									course={course}
								/>
							</div>
						))}
					</div>
				</div>
				{/* Right Side */}
				<div className="col-span-1 h-80 ">
					<Avatar className="w-40 h-40">
						<AvatarImage src={instructor?.profile.imageUrl}></AvatarImage>
						<AvatarFallback>{fullName[0]}</AvatarFallback>
					</Avatar>
				</div>
			</div>
		</PageWrapper>
	);
};

export default InstructorIdContainer;
