import React from "react";
import { Input } from "../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import SearchCommand from "../search-command";
import db from "@/lib/db";

const NavbarSearch = async () => {
	const categories = await db.category.findMany();
	return (
		<div className="ml-auto md:ml-0  items-center border rounded-md pr-2 hidden lg:flex">
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
