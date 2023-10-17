"use client";
import { useSearchStore } from "@/hooks/use-search-command";
import { strokeWidth } from "@/lib/constant";
import { Search } from "lucide-react";
import React from "react";

const MobileSearchButton = () => {
	const setOpen = useSearchStore().setOpen;
	return (
		<Search
			strokeWidth={strokeWidth}
			className="w-5 h-5 font-bold flex lg:hidden cursor-pointer hover:opacity-75 transition"
			onClick={() => setOpen(true)}
		/>
	);
};

export default MobileSearchButton;
