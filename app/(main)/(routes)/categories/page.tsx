import db from "@/lib/db";
import Image from "next/image";
import React from "react";

import CategoryImage from "public/categories/category-software.jpg";

const CategoriesPage = async () => {
	const categories = await db.category.findMany();
	const topCategories = categories.filter((c) => c.parentId === null);
	return (
		<div className="w-full px-8 md:px-12 lg:px-24 xl:px-40 2xl:px-60 flex flex-col gap-y-8 py-24">
			{/* Popüler Kategoriler */}
			<p className="text-3xl font-bold text-muted-foreground">Kategoriler</p>

			<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-8">
				{topCategories.map((category) => (
					<div
						key={category.id}
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
					</div>
				))}
			</div>

			{/* 	{categories.map((category) => (
				<pre key={category.id}>{JSON.stringify(category, null, 4)}</pre>
			))} */}
		</div>
	);
};

export default CategoriesPage;
