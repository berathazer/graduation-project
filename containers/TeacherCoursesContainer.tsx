import { CourseCard } from "@/components/course-card";

import { Button } from "@/components/ui/button";

import db from "@/lib/db";
import { cn } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

import React from "react";

import Image1 from "/public/instructor/instructor-1.jpg";
import Image2 from "/public/instructor/instructor-2.jpg";
import Image3 from "/public/instructor/instructor-3.jpg";

const TeacherCoursesContainer = async ({ profileId }: { profileId: string }) => {
	const courses = await db.course.findMany({
		where: {
			profileId: profileId || "",
		},
		include: {
			category: true,
			chapters: true,
		},
	});

	return (
		<div className={cn("p-4 flex flex-col h-full", courses.length === 0 && "")}>
			{courses.length === 0 && (
				<div className="flex flex-col gap-y-2 md:gap-y-4 w-full ">
					<div className="w-full  flex flex-col gap-y-4 ">
						<div className="flex gap-x-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-20 px-4 md:px-8 lg:px-12 xl:px-20 py-4 shadow-md border border-gray-100">
							<div className="w-64 h-52 relative flex items-center justify-center">
								<Image
									alt=""
									src={Image1}
									fill
								/>
							</div>
							<div
								className={cn(
									"flex flex-1 flex-col pt-2 gap-y-8 text-teal-600 md:pr-4 lg:pr-8 xl:pr-20"
								)}
							>
								<span className={cn(" text-xl font-medium text-black")}>
									İlgi Çekici Bir Kurs Oluşturun
								</span>
								<p className="text-black/80">
									İster yıllardır öğretmenlik yapıyor olun ister ilk kez öğretmenlik
									yapıyor olun, ilgi çekici bir kurs hazırlayabilirsiniz. Nereden
									başlıyor olursanız olun bir sonraki seviyeye geçmenize yardımcı
									olacak kaynakları ve en iyi uygulamaları derledik.
								</p>
								<Link href={"/teacher/create"}>
									<Button
										variant={"linkDelete"}
										className="relative right-4 underline hover:bg-slate-100 hover:text-emerald-800"
									>
										İlk Kursunuzu Oluşturmaya Başlayın
									</Button>
								</Link>
							</div>
						</div>

						<div className="flex gap-x-4">
							<div className="flex flex-1 gap-x-2 border border-gray-100 shadow-md p-4">
								<div className="w-44 h-36 relative">
									<Image
										alt=""
										src={Image2}
										fill
										className="object-fill"
									/>
								</div>
								<div className="flex flex-col gap-y-4 flex-1">
									<span className="mt-2 text-lg font-medium">
										Video Oluşturarak Başlayın
									</span>
									<p className="text-black/80">
										İstediğiniz alanda video ve derslerinizi hazırlayarak kursunuzu
										oluşturun.
									</p>
								</div>
							</div>
							<div className="flex flex-1 gap-x-2 border border-gray-100 shadow-md p-4">
								<div className="flex flex-col gap-y-4 flex-1 ">
									<span className="mt-2 text-lg font-medium">
										Hedef Kitlenizi Oluşturun
									</span>
									<p className="text-black/80">
										Hedef kitlenize hitap eden kursunuzu hazırlayın ve olabildiğince
										fazla kitleye ulaşın.
									</p>
								</div>
								<div className="w-44 h-36 relative">
									<Image
										alt=""
										src={Image3}
										fill
										className="object-fill"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{courses.length > 0 && (
				<>
					<div className="pb-4 flex flex-col gap-y-4">
						<Link href={"/teacher/create"}>
							<Button className="">Yeni Kurs Ekle</Button>
						</Link>
						<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
							{courses.map((course) => (
								<CourseCard
									key={course.id}
									category={course.category?.name || ""}
									chaptersLength={course.chapters.length}
									id={course.id}
									imageUrl={course.imageUrl || ""}
									price={course.price || 0}
									title={course.title}
									url={course.url}
									progress={5}
									isPublished={course.isPublished}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default TeacherCoursesContainer;
