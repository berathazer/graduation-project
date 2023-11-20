import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RadioGroup } from "../ui/radio-group";

import StarFilter from "./star-filter";
import LevelFilter from "./level-filter";
import VideoTimeFilter from "./video-time-filter";

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
export function SearchFilters() {
	return (
		<Accordion
			type="multiple"
			className="w-full"
			defaultValue={["item-1", "item-2", "item-3"]}
		>
			{/* Oylamaya Göre */}
			<AccordionItem value="item-1">
				<AccordionTrigger className="text-lg font-medium">Oy Oranı</AccordionTrigger>
				<AccordionContent>
					<StarFilter filters={startFilters} />
				</AccordionContent>
			</AccordionItem>

			{/* Kurs Seviyesine Göre */}
			<AccordionItem value="item-2">
				<AccordionTrigger>Kurs Seviyesi</AccordionTrigger>
				<AccordionContent>
					<LevelFilter />
				</AccordionContent>
			</AccordionItem>

			{/* Video Uzunluğuna Göre */}
			<AccordionItem
				value="item-3"
				className="border-none"
			>
				<AccordionTrigger>Video Uzunluğu</AccordionTrigger>
				<AccordionContent>
					<VideoTimeFilter />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
