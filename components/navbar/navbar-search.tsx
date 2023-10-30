"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import SearchCommand from "../search-command";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

interface NavbarSearchProps {
	categories: Category[];
}
const NavbarSearch = ({ categories }: NavbarSearchProps) => {
	const [search, setSearch] = useState("");
	const router = useRouter();
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && search !== "") {
			// Enter tuşuna basıldığında yapılacak işlemi burada gerçekleştirin.

			console.log("Enter tuşuna basıldı:", search);
			router.push(`/search?q=${search}`);
			setSearch("");
		}
	};
	return (
		<div className="ml-auto md:ml-6  items-center border rounded-md pr-2 hidden lg:flex">
			<Input
				onKeyDown={handleKeyDown}
				onChange={(e) => setSearch(e.target.value)}
				value={search}
				type="text"
				placeholder="Kursları arayın..."
				className={cn(without_focus, "hidden lg:flex border-none")}
			/>
			<SearchCommand categories={categories} />
		</div>
	);
};

export default NavbarSearch;
