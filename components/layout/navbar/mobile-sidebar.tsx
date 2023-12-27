import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { strokeWidth } from "@/lib/constant";
import db from "@/lib/db";
import { formatCategoryNameToUrl } from "@/lib/helpers";
import { Category, MemberRole } from "@prisma/client";
import { ChevronRight, Menu } from "lucide-react";

import Link from "next/link";

interface MobileSidebarProps {
	categories: Category[];
	role: MemberRole | undefined;
}
export default async function MobileSidebar({ categories, role }: MobileSidebarProps) {
	const parentCategories = categories.filter((c) => c.parentId === null);

	const isTeacher = role === MemberRole.TEACHER;
	const isAdmin = role === MemberRole.ADMIN;


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

					{parentCategories.map((category) => (
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
					{isTeacher && (
						<Link
							href={"/teacher/courses"}
							className="px-4 mt-8"
						>
							<Button className="w-full">Öğretmen Modu</Button>
						</Link>
					)}

					{isAdmin && (
						<Link
							href={"/admin"}
							className="px-4 mt-8"
						>
							<Button className="w-full">Admin Paneli</Button>
						</Link>
					)}
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
