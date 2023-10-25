import React from "react";
import { Input } from "../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import SearchCommand from "../search-command";

import { Category } from "@prisma/client";

interface NavbarSearchProps {
	categories: Category[];
}
const NavbarSearch = async ({ categories }: NavbarSearchProps) => {
	return (
		<div className="ml-auto md:ml-6  items-center border rounded-md pr-2 hidden lg:flex">
			<Input
				type="text"
				placeholder="Kursları arayın..."
				className={cn(without_focus, "hidden lg:flex border-none")}
			/>
			<SearchCommand categories={categories} />
		</div>
	);
};

export default NavbarSearch;
