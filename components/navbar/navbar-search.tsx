import React from "react";
import { Input } from "../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";

const NavbarSearch = () => {
	return (
		<div className="ml-auto md:ml-0">
			<Input
				type="text"
				placeholder="Kursları arayın..."
				className={cn("hidden md:flex", without_focus)}
			/>
		</div>
	);
};

export default NavbarSearch;
