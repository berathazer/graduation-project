"use client";
import React, { useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";

import { formatCategoryNameToUrl } from "@/lib/helpers";
import { ChevronRight } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";

interface CategoriesTooltipProps {
	categories: Category[];
}
const CategoriesTooltip = ({ categories }: CategoriesTooltipProps) => {
	const mainCategories = categories.filter((c) => c.parentId === null);
	const [isMenuOpen, setIsMenuOpen] = useState(false); // Hover menünün açık/kapalı olduğunu takip etmek için bir state
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip open={isMenuOpen}>
				<TooltipTrigger>
					<Link
						href={"/categories"}
						className="relative mr-2 font-medium hidden md:flex"
						onMouseEnter={() => setIsMenuOpen(true)}
					>
						Kategoriler
					</Link>
				</TooltipTrigger>
				<TooltipContent
					className="mt-[22px] rounded-none"
					onMouseLeave={() => setIsMenuOpen(false)}
				>
					<div className="flex flex-col py-4 px-0 gap-y-0 h-[420px] w-[240px]">
						{mainCategories.map((category, index) => {
							return (
								<Tooltip key={category.id}>
									<TooltipTrigger id={category.id}>
										<Link
											href={`/categories/${formatCategoryNameToUrl(category.url)}`}
											key={category.id}
											className="flex items-center justify-between py-2 px-2 transition hover:bg-slate-50 rounded-md"
											onMouseEnter={() => setActiveIndex(index + 1)}
										>
											{category.name}
											<ChevronRight
												strokeWidth={strokeWidth}
												className="w-4 h-4"
											/>
										</Link>
									</TooltipTrigger>
									<TooltipContent
										className={cn(
											"ml-[9px] rounded-none",
											activeIndex < 4 && "mt-[148px]",
											activeIndex === 4 && `mt-[168px] relative bottom-5`,
											activeIndex > 4 && ""
										)}
										side="right"
									>
										<div className="flex flex-col py-4 px-0 gap-y-0 h-[420px] w-[240px]">
											{categories
												.filter((c) => c.parentId === category.id)
												.map((subCategory) => (
													<Link
														href={`/categories/${formatCategoryNameToUrl(
															subCategory.url
														)}`}
														key={subCategory.id}
														className="flex items-center justify-between py-2 px-2 transition hover:bg-slate-50 rounded-md"
														onMouseEnter={() => {
															console.log(
																categories.filter(
																	(c) => c.parentId === subCategory.id
																)
															);
														}}
													>
														{subCategory.name}
														<ChevronRight
															strokeWidth={strokeWidth}
															className="w-4 h-4"
														/>
													</Link>
												))}
										</div>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default CategoriesTooltip;
