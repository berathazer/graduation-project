import { CategoryImageForm } from "@/components/admin/category-image-form";
import { CategoryNameEdit } from "@/components/admin/category-name-edit";
import { CategoryUrlEdit } from "@/components/admin/category-url-edit";
import db from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface AdminCategoryIdPageProps {
	params: {
		categoryId: string;
	};
}

const AdminCategoryIdPage = async ({ params }: AdminCategoryIdPageProps) => {
	const category = await db.category.findUnique({
		where: {
			id: params.categoryId,
		},
	});

	if (!category) {
		return null;
	}

	return (
		<div className="p-4">
			<div className="flex flex-col">
				<Link
					href={`/admin`}
					className="flex w-max  items-center text-sm hover:opacity-75 transition mb-6"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					Geri Dön
				</Link>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2">
						<h1 className="text-2xl font-medium">Kategoriyi Güncelleyin</h1>
						<span className="text-sm text-slate-700">
							İstediğiniz alanları güncelleyebilirsiniz.
						</span>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-6">
				<div className="col-span-1 grid grid-cols-1 gap-4">
					<CategoryNameEdit
						categoryId={category?.id}
						initialName={category?.name}
					/>

					<CategoryUrlEdit
						categoryId={category?.id}
						initialName={category?.url}
					/>
				</div>

				<div className="col-span-1">
					{" "}
					<CategoryImageForm
						categoryId={category.id}
						initialData={category.imageUrl}
					/>
				</div>
			</div>
		</div>
	);
};

export default AdminCategoryIdPage;
