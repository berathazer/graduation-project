"use client";
import CourseRating from "@/components/courses/course-rating";
import { Badge } from "@/components/ui/badge";
import { strokeWidth } from "@/lib/constant";
import { formatProductPrice } from "@/lib/helpers";
import { urls } from "@/lib/urls";
import { Chapter, Course, CourseFeature } from "@prisma/client";
import axios from "axios";
import { TagIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BasketCourseCard {
	course: Course & {
		courseFeature: CourseFeature;
		chapters: Chapter[];
	};
}

const BasketCourseCard = ({ course }: BasketCourseCard) => {
	const clickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
		try {
		} catch (error) {}
	};
	return (
		<div className="flex w-full gap-x-2">
			<Link
				href={`${urls.courses}/${course.url}`}
				className="flex  gap-x-3 pr-4"
			>
				<div className="relative w-32 h-20">
					<Image
						src={course.imageUrl!}
						alt={course.title}
						fill
					/>
				</div>
				<div className="flex flex-col gap-y-1">
					<p className="font-bold text-sm">{course.title}</p>
					<p className="text-xs  text-muted-foreground">{course.instructor}</p>
					<div className="flex gap-x-3">
						<CourseRating
							rating={4}
							size={12}
							color=""
						/>
						<Badge className="rounded-none hover:bg-black ">
							{course.courseFeature.difficulty}
						</Badge>
					</div>
					<div className="flex gap-x-2 py-2">
						<span className="text-xs text-muted-foreground">{`${course.chapters.length} Ders`}</span>
						<p className="w-1 h-1 rounded-full bg-slate-500 self-center"></p>
						<span className="text-xs text-muted-foreground">42 Saat</span>
					</div>
					<div className="flex gap-x-2 items-center">
						<span className="font-medium">{formatProductPrice(course.price || 0)}</span>
						<TagIcon
							className="w-4 h-4 text-emerald-500"
							strokeWidth={strokeWidth}
						/>
					</div>
				</div>
			</Link>

			<div className="flex ml-auto items-start">
				<button
					className="p-2 rounded-full bg-slate-50"
					onClick={clickHandler}
					type="button"
				>
					<X
						className="w-5 h-5"
						strokeWidth={strokeWidth}
					/>
				</button>
			</div>
		</div>
	);
};

export default BasketCourseCard;
