"use client";

import { useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { cn } from "@/lib/utils";

function getRating(rating: number) {
	switch (rating) {
		case 1:
			return "Kötü, oldukça hayal kırıklığı";
		case 2:
			return "Zayıf, beklediğim gibi değildi";
		case 3:
			return "Ortalama, daha iyi olabilirdi";
		case 4:
			return "Güzel, istediğim gibiydi";
		case 5:
			return "Muhteşem, beklediğimden daha iyiydi";
		default:
			return "Yıldız Seçin";
	}
}

interface SelectRatingProps {
	onChange: (rating: number) => void;
	rating: number;
}

const SelectRating = ({ onChange, rating }: SelectRatingProps) => {
	const [hoveredRating, setHoveredRating] = useState(0);

	return (
		<div className="flex flex-col  items-center justify-center">
			<div className="font-semibold">{getRating(rating)}</div>
			<ReactRating
				className="pt-4 pb-2"
				style={{ maxWidth: 200 }}
				value={rating}
				onChange={onChange}
				onHoverChange={setHoveredRating}
			/>

			<div className={cn("text-sm text-muted-foreground", !hoveredRating && "opacity-0")}>
				{!!hoveredRating ? getRating(hoveredRating) : "s"}
			</div>
		</div>
	);
};
export default SelectRating;
