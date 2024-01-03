import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import CategoryImage from "public/categories/category-software.jpg";

const PopularCategories = async () => {
	const categories = await db.category.findMany({
		where: { parentId: { equals: null } },
	});

	return (
		<section
			id="popularCategories"
			className="px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24"
		>
			<p className="text-3xl font-bold text-muted-foreground">Popüler Kategoriler</p>
			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-8">
				{categories.splice(0, 6).map((category) => (
					<Link
						key={category.id}
						href={`/courses?categoryId=${category.id}`}
						className="flex flex-col gap-y-2"
					>
						<div className="w-full h-[300px] relative">
							<Image
								alt={category.name}
								src={CategoryImage}
								fill
								className="object-fill"
							/>
						</div>
						<span className="font-medium text-xl">{category.name}</span>
					</Link>
				))}
			</div>
		</section>
	);
};

export default PopularCategories;
