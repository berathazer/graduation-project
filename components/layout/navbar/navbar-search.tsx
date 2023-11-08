"use client";
import React, { useRef, useState } from "react";
import { Input } from "../../ui/input";
import { without_focus } from "@/lib/constant";
import { cn } from "@/lib/utils";
import SearchCommand from "../../search-command";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";

interface NavbarSearchProps {
	categories: Category[];
}
const NavbarSearch = ({ categories }: NavbarSearchProps) => {
	const inputRef = React.useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const search = inputRef.current?.value;
		if (e.key === "Enter" && search !== "") {
			router.push(`/search?q=${search}`);
			inputRef.current!.value = "";
		}
	};
	return (
		<div className="ml-auto md:ml-6  items-center border rounded-md pr-2 hidden lg:flex">
			<Input
				onKeyDown={handleKeyDown}
				ref={inputRef}
				type="text"
				placeholder="Kursları arayın..."
				className={cn(without_focus, "hidden lg:flex border-none")}
			/>
			<SearchCommand categories={categories} />
		</div>
	);
};

export default NavbarSearch;
