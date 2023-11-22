"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { without_focus } from "@/lib/constant";
import { SortingTypes } from "@/types/global.types";
import { useRouter } from "next/navigation";

const orders = [
	{
		name: "En Yeniler",
		value: SortingTypes.newest,
	},
	{
		name: "Yüksek Oy Alanlar",
		value: SortingTypes["highest-voted"],
	},
	{
		name: "En Fazla Yorum Alanlar",
		value: SortingTypes["most-reviewed"],
	},
];
export function SortFilter() {
	const [position, setPosition] = React.useState("bottom");
	const router = useRouter();

	const changeSortType = (value: string) => {
		const currentSearchParams = new URLSearchParams(window.location.search);
		currentSearchParams.set("sort", value);
		router.push(`/search?${currentSearchParams.toString()}`);
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className={cn("rounded-none h-full border-black px-4 py-3", without_focus)}
				>
					Kursları Sıralayın
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56">
				<DropdownMenuRadioGroup
					value={position}
					onValueChange={setPosition}
				>
					{orders.map((order, index) => (
						<DropdownMenuRadioItem
							key={index}
							value={order.value}
							onClick={() => changeSortType(order.value)}
						>
							{order.name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
