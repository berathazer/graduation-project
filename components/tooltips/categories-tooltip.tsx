import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import db from "@/lib/db";
import { formatCategoryNameToUrl } from "@/lib/helpers";

const CategoriesTooltip = async () => {
	const categories = await db.category.findMany();

	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						href={"/categories"}
						className="relative mr-2"
					>
						Kategoriler
					</Link>
				</TooltipTrigger>
				<TooltipContent className="mt-[22px] rounded-none">
					<div className="flex flex-col py-4 px-2	gap-y-4">
						{categories.map((category) => (
							<Link
								href={`/categories/${formatCategoryNameToUrl(category.url)}`}
								key={category.id}
							>
								{category.name}
							</Link>
						))}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CategoriesTooltip;
