import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import AdminCategoryCard from "@/components/admin/admin-category-card";
import CreateCategoryDialog from "@/components/admin/create-category-dialog";

const AdminContainer = async () => {
	const categories = await db.category.findMany({
		where: {
			parentId: { equals: null },
		},
		orderBy: {
			createdAt: "desc",
		},
	});

	return (
		<div className={cn("p-4 flex flex-col h-full", categories.length === 0 && "")}>
			{categories.length > 0 && (
				<>
					<div className="pb-4 flex flex-col gap-y-4">
						<CreateCategoryDialog />
						<div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							{categories.map((category) => (
								<AdminCategoryCard
									key={category.id}
									category={category}
								/>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminContainer;
