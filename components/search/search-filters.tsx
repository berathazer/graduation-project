"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import StarFilter from "./star-filter";
import LevelFilter from "./level-filter";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

const startFilters = [
	{
		id: "4-star",
		rating: 4,
		courseCount: 8,
		filter: "4 ve üstü",
		value: "gt_4",
	},
	{
		id: "3-star",
		rating: 3,
		courseCount: 12,
		filter: "3 ve üstü",
		value: "gt_3",
	},
	{
		id: "2-start",
		rating: 2,
		courseCount: 14,
		filter: "2 ve üstü",
		value: "gt_2",
	},
];
export function SearchFilters({ q }: { q: string }) {
	const router = useRouter();
	const clearFilter = () => {
		router.replace(`/search?q=${q}`);
		router.refresh();
	};

	return (
		<Accordion
			type="multiple"
			className="w-full"
			defaultValue={["item-1", "item-2"]}
		>
			{/* Oylamaya Göre */}
			<AccordionItem
				value="item-1"
				className="flex flex-col "
			>
				<AccordionTrigger className="text-lg font-medium ">Oy Oranı</AccordionTrigger>
				<AccordionContent>
					<StarFilter filters={startFilters} />
				</AccordionContent>
			</AccordionItem>

			{/* Kurs Seviyesine Göre */}
			<AccordionItem
				value="item-2"
				className="border-none"
			>
				<AccordionTrigger>Kurs Seviyesi</AccordionTrigger>
				<AccordionContent>
					<LevelFilter />
				</AccordionContent>
			</AccordionItem>

			{/* Video Uzunluğuna Göre */}
			{/* 	<AccordionItem
				value="item-3"
				className="border-none"
			>
				<AccordionTrigger>Video Uzunluğu</AccordionTrigger>
				<AccordionContent>
					<VideoTimeFilter />
				</AccordionContent>
			</AccordionItem> */}
			{/* 		<Link
				className="w-full"
				href={`/search?q=${q}`}
			>
				<Button className="w-full">Filtreleri Temizle</Button>
			</Link> */}

			<Button
				className="w-full"
				onClick={clearFilter}
			>
				Filtreleri Temizle
			</Button>
		</Accordion>
	);
}
