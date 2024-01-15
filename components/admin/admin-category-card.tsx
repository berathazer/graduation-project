import { formatJoinDate, formatReviewDate } from "@/lib/helpers";
import { Category } from "@prisma/client";
import Image from "next/image";
import React from "react";

import defaultImage from "public/categories/category-software.jpg";
import Link from "next/link";

interface AdminCategoryCardProps {
	category: Category;
}
const AdminCategoryCard = ({ category }: AdminCategoryCardProps) => {
	return (
		<Link href={`/admin/categories/${category.id}`}>
			<div className="flex flex-col gap-y-4 h-full w-full group hover:shadow-sm cursor-pointer transition overflow-hidden border rounded-lg p-3">
				<div className="relative w-full h-64 ">
					<Image
						src={category.imageUrl || defaultImage}
						alt={category.name}
						fill
						className="rounded-md"
					/>
				</div>
				<p>{category.name}</p>
				<p>{formatReviewDate(category.createdAt)}</p>
			</div>
		</Link>
	);
};

export default AdminCategoryCard;
