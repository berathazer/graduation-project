import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { strokeWidth } from "@/lib/constant";
import db from "@/lib/db";
import { formatCategoryNameToUrl } from "@/lib/helpers";
import { Category } from "@prisma/client";
import { ChevronRight, Menu } from "lucide-react";

import Link from "next/link";

interface MobileSidebarProps {
	categories: Category[];
}
export default async function MobileSidebar({ categories }: MobileSidebarProps) {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
				<Menu strokeWidth={strokeWidth} />
			</SheetTrigger>

			<SheetContent
				side={"left"}
				className="p-0"
			>
				<Link
					href={"/"}
					className="w-full py-6 px-4 flex items-center relative text-2xl font-bold border-b"
				>
					Ogreniyor
				</Link>
				<div className="flex flex-col">
					<Link
						href={"/categories"}
						className="flex items-center px-4 py-4 font-bold text-xl"
					>
						Kategoriler
					</Link>

					{categories.map((category) => (
						<div
							key={category.id}
							className="flex items-center hover:bg-slate-50 transition px-6 py-2"
						>
							<Link
								href={`/categories/${formatCategoryNameToUrl(category.url)}`}
								className="flex items-center justify-between w-full"
							>
								<span>{category.name}</span>
								<ChevronRight strokeWidth={strokeWidth} />
							</Link>
						</div>
					))}
				</div>
				<SheetFooter>
					{/* <SheetClose asChild>
						<Button type="submit">Save changes</Button>
					</SheetClose> */}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
