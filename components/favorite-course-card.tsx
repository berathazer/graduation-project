import { formatProductPrice } from "@/lib/helpers";
import { Category, Course, Favorite } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import AddFavoriteButton from "./buttons/add-favorite-button";

interface FavoriteCourseCardProps {
	favorite: Favorite & {
		course: Course & {
			category: Category | null;
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
				courseId={favorite.course.id}
				isFavorite={true}
				favoriteId={favorite.id}
				className="absolute top-2 right-2 h-8 w-8 rounded-full p-1  z-[9999]"
			/>
			{/* Resim */}
			<div className="w-full flex-1 max-h-44 bg-black relative object-fill">
				<Image
					alt={favorite.course.title}
					src={favorite.course.imageUrl || NodeJs}
					fill
					className="group-hover:opacity-75 transition-all duration-300"
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
			<p className="font-bold text-black/80">{formatProductPrice(favorite.course.price || 59)}</p>
		</Link>
	);
};

export default FavoriteCourseCard;
