import db from "@/lib/db";
import Image from "next/image";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";

import CourseCategories from "@/components/course-categories";
import { formatProductPrice } from "@/lib/helpers";
import { CourseWithCategory } from "@/types/global.types";
import Link from "next/link";

const maxTitleLength = 50;

interface CoursesPageProps {
	searchParams: {
		categoryId: string;
	};
}

const CoursesPage = async ({ searchParams }: CoursesPageProps) => {
	const categoryId = searchParams.categoryId;
	const categories = await db.category.findMany({
		where: {
			parentId: {
				equals: null,
			},
		},
	});

	let courses: CourseWithCategory[];
	if (!categoryId) {
		//@ts-ignore
		courses = await db.course.findMany({
			include: {
				category: true,
			},
		});
	} else {
		//@ts-ignore
		courses = await db.course.findMany({
			where: {
				categoryId: searchParams.categoryId,
			},
			include: {
				category: true,
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
						<div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-5 place-items-center gap-y-8 gap-x-5">
							{courses.map((course, i) => (
								<Link
									href={`/courses/${course.url}`}
									key={i}
									className="w-full flex flex-col gap-y-2 h-[288px]"
								>
									{/* Resim */}
									<div className="w-full flex-1 max-h-44 bg-slate-200 relative object-fill">
										<Image
											alt={course.title}
											src={course.imageUrl || NodeJs}
											fill
										/>
									</div>
									{/* Kurs ismi */}
									<p className="font-bold flex flex-col">
										{course.title.length > maxTitleLength
											? course.title.slice(0, maxTitleLength) + "..."
											: course.title}
										<span className="text-muted-foreground text-xs">{`(${course.category?.name})`}</span>
									</p>

									<p className="text-[12px] text-black/70">{course.instructor}</p>
									<p className="font-bold text-black/80">
										{formatProductPrice(course.price || 59)}
									</p>
								</Link>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default CoursesPage;
