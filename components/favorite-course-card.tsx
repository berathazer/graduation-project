import { formatProductPrice } from "@/lib/helpers";
import { Category, Chapter, Course, Favorite } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import AddFavoriteButton from "./buttons/add-favorite-button";
import { Skeleton } from "./ui/skeleton";
import LoadingImage from "./courses/loading-image";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";

interface FavoriteCourseCardProps {
	favorite: Favorite & {
		course: Course & {
			category: Category | null;
			chapters: Chapter[];
		};
	};
}

const maxTitleLength = 50;
const FavoriteCourseCard = ({ favorite }: FavoriteCourseCardProps) => {
	return (
		<Link
			href={`/courses/${favorite.course.url}`}
			className="w-full flex flex-col gap-y-2 h-[288px] group relative"
		>
			{/* Favorite Button */}
			<AddFavoriteButton
				basket={[]}
				courseId={favorite.course.id}
				isFavorite={true}
				favoriteId={favorite.id}
				className="absolute top-2 right-2 h-8 w-8 rounded-full p-1  z-[9999]"
			/>
			{/* Resim */}
			<div className="w-full flex-1 max-h-44 bg-black relative object-fill">
				<LoadingImage
					title={favorite.course.title}
					imageUrl={favorite.course.imageUrl || ""}
					className="rounded-none"
				/>
			</div>
			{/* Kurs ismi */}
			<p className="font-bold flex flex-col">
				{favorite.course.title.length > maxTitleLength
					? favorite.course.title.slice(0, maxTitleLength) + "..."
					: favorite.course.title}
				<span className="text-muted-foreground text-xs">{`(${favorite.course.category?.name})`}</span>
			</p>
			<p></p>
			<p className="text-[12px] text-black/70">{favorite.course.instructor}</p>
			{/* <p className="font-bold text-black/80 text-end">
				{formatProductPrice(favorite.course.price || 59)}
			</p> */}
			<div className="flex items-center justify-between font-bold text-black/80">
				<div className="flex items-center gap-x-1 text-slate-500 text-xs font-light">
					<IconBadge
						size="sm"
						icon={BookOpen}
					/>
					<span>{favorite.course.chapters?.length} Bölüm</span>
				</div>
				<span>{formatProductPrice(favorite.course.price || 59)}</span>
			</div>
		</Link>
	);
};

export const FavoriteCourseCardSkeleton = () => {
	return (
		<Link
			href="#"
			className="w-full flex flex-col gap-y-2 h-[288px] group relative"
		>
			{/* Favorite Button Skeleton */}
			<div className="absolute top-2 right-2 h-8 w-8 rounded-full p-1 bg-gray-300 animate-pulse"></div>

			{/* Resim Skeleton */}
			<div className="w-full flex-1 max-h-44 bg-gray-300 relative object-fill">
				<Skeleton className="group-hover:opacity-75 transition-all duration-300" />
			</div>

			{/* Kurs ismi Skeleton */}
			<div className="flex flex-col">
				<Skeleton className="h-4 w-3/4 mb-1" />
				<Skeleton className="h-3 w-1/2" />
			</div>

			{/* Diğer Bilgiler Skeleton */}
			<Skeleton className="h-2 w-1/3" />
			<Skeleton className="h-2 w-1/4 mb-1" />
			<Skeleton className="h-4 w-1/3" />
		</Link>
	);
};
export default FavoriteCourseCard;
