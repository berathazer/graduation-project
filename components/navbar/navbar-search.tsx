import React from "react";
import { Input } from "../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import SearchCommand from "../search-command";

const NavbarSearch = () => {
	return (
		<div className="ml-auto md:ml-0  items-center border rounded-md pr-2 hidden lg:flex">
			<Input
				type="text"
				placeholder="Kursları arayın..."
				className={cn(without_focus, "hidden lg:flex border-none")}
			/>
			<SearchCommand />
		</div>
	);
};

export default NavbarSearch;
