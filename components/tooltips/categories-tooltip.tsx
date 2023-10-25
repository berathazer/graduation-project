import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import db from "@/lib/db";
import { formatCategoryNameToUrl } from "@/lib/helpers";
import { ChevronRight } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { Category } from "@prisma/client";

interface CategoriesTooltipProps {
	categories: Category[];
}

const CategoriesTooltip = async ({ categories }: CategoriesTooltipProps) => {
	const mainCategories = categories.filter((c) => c.parentId === null);
	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger>
					<Link
						href={"/categories"}
						className="relative mr-2 font-medium hidden md:flex"
					>
						Kategoriler
					</Link>
				</TooltipTrigger>
				<TooltipContent className="mt-[22px] rounded-none">
					<div className="flex flex-col py-4 px-0	gap-y-0 h-[420px] w-[240px]">
						{mainCategories.map((category) => {
							return (
								<Link
									href={`/categories/${formatCategoryNameToUrl(category.url)}`}
									key={category.id}
									className="flex items-center justify-between py-2 px-2 transition hover:bg-slate-50 rounded-md"
								>
									{category.name}
									<ChevronRight
										strokeWidth={strokeWidth}
										className="w-4 h-4"
									/>
								</Link>
							);
						})}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CategoriesTooltip;
