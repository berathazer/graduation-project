"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Skeleton } from "./ui/skeleton";

interface CourseCategoriesProps {
	categories: Category[];
}

const CourseCategories = ({ categories }: CourseCategoriesProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const categoryId = searchParams.get("categoryId");

	const onCategoryClick = (categoryId: string) => {
		if (!categoryId) return router.push(`/courses`);
		router.push(`/courses?categoryId=${categoryId}`);
	};

	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
			<button
				type="button"
				onClick={() => onCategoryClick("")}
				className={cn(
					"border px-4 py-2 rounded-md text-xs font-medium hover:border-amber-600 cursor-pointer transition",
					!categoryId && "border-amber-600 bg-amber-50 text-amber-500"
				)}
			>
				Hepsi
			</button>
			{categories.map((category) => (
				<button
					type="button"
					onClick={() => onCategoryClick(category.id)}
					key={category.id}
					className={cn(
						"border px-4 py-2 rounded-md text-xs font-medium hover:border-amber-600 cursor-pointer transition",
						categoryId === category.id && "border-amber-600 bg-amber-50 text-amber-500"
					)}
				>
					{category.name}
				</button>
			))}
		</div>
	);
};

export const CourseCategoriesSkeleton = () => {
	return (
		<div className="flex flex-wrap gap-2 items-center justify-center">
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
