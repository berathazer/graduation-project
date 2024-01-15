"use client";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import CourseRating from "../courses/course-rating";
import { useRouter, useSearchParams } from "next/navigation";

interface StartFilterProps {
	filters: { id: string; rating: number; courseCount: number; filter: string; value: string }[];
}

const StarFilter = ({ filters }: StartFilterProps) => {
	const router = useRouter();
	const searchParam = useSearchParams();

	const handleRadioClick = (value: string) => {
		const currentSearchParams = new URLSearchParams(window.location.search);
		currentSearchParams.set("rating", value);
		router.push(`/search?${currentSearchParams.toString()}`);
	};

	return (
		<div className="flex flex-col gap-y-4">
			<RadioGroup defaultValue={searchParam.get("rating")!}>
				{filters.map((filter, index) => (
					<div
						className="flex items-center space-x-2"
						key={filter.id}
					>
						<RadioGroupItem
							value={filter.value}
							id={filter.id}
							onClick={() => handleRadioClick(filter.value)}
						/>

						<Label
							htmlFor={filter.id}
							className="flex items-center relative bottom-[1px] gap-x-4"
						>
							<CourseRating
								rating={filter.rating}
								size={13}
								color="orange"
							/>
							<span>{filter.filter}</span>
						</Label>
					</div>
				))}
			</RadioGroup>
		</div>
	);
};

export default StarFilter;
