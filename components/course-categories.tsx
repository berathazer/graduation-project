import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

interface CourseCategoriesProps {
	categories: Category[];

	categoryId: string;
}

const CourseCategories = ({ categories, categoryId }: CourseCategoriesProps) => {
	console.log("categoryId: " + categoryId);

	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<Link
				href={"/courses"}
				className={cn(
					"border px-4 py-2 rounded-md text-xs font-medium hover:border-amber-600 cursor-pointer transition",
					!categoryId && "border-amber-600 bg-amber-50 text-amber-500"
				)}
			>
				Hepsi
			</Link>

			{categories.map((category) => (
				<Link
					href={`/courses?categoryId=${category.id}`}
					key={category.id}
					className={cn(
						"border px-4 py-2 rounded-md text-xs font-medium hover:border-amber-600 cursor-pointer transition",
						categoryId === category.id && "border-amber-600 bg-amber-50 text-amber-500"
					)}
				>
					{category.name}
				</Link>
			))}
		</div>
	);
};

export const CourseCategoriesSkeleton = () => {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center pt-6">
			{Array.from({ length: 12 }).map((_, index) => (
				<Skeleton
					key={index}
					className={cn(
						"border px-4 py-2 h-9 w-20 rounded-md text-xs font-medium  cursor-pointer transition"
					)}
				/>
			))}
		</div>
	);
};
export default CourseCategories;
