import db from "@/lib/db";
import Image from "next/image";
import React from "react";

import CategoryImage from "public/categories/category-software.jpg";
import PageWrapper from "@/containers/PageWrapper";
import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import { categoriesNavigation } from "@/lib/navigations";

const CategoriesPage = async () => {
	const categories = await db.category.findMany();
	const topCategories = categories.filter((c) => c.parentId === null);
	return (
		<PageWrapper>
			{/* Popüler Kategoriler */}
			<NavigationBreadcrumb
				title="Kategoriler"
				navigations={categoriesNavigation}
			/>
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
		</PageWrapper>
	);
};

export default CategoriesPage;
