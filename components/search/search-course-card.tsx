import Image from "next/image";
import React from "react";
import NodeJs from "public/courses/node-js-course.png";
import CourseRating from "../courses/course-rating";
import { formatProductPrice } from "@/lib/helpers";
import { TagIcon } from "lucide-react";
import { strokeWidth } from "@/lib/constant";
const SearchCourseCard = () => {
	return (
		<div className="flex w-full gap-x-4">
			<div className="relative w-[242px] h-[137px] border">
				<Image
					alt=""
					src={NodeJs}
				/>
			</div>
			<div className="flex flex-col flex-1 relative bottom-1">
				<p className=" font-bold">Lorem, ipsum dolor.</p>
				<p className=" font-medium">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, et?etur
					adipisicing elit. Voluptas, et?
				</p>
				<span className="text-sm text-muted-foreground">{"instructor"}</span>
				<CourseRating
					color="orange"
					rating={4}
					size={16}
					valueShow
				/>
				<div className="flex gap-x-2 py-2">
					<span className="text-xs text-muted-foreground">{`${2} Ders`}</span>
					<p className="w-1 h-1 rounded-full bg-slate-500 self-center"></p>
					<span className="text-xs text-muted-foreground">42 Saat</span>
				</div>
			</div>
			<div className="text-black/80 font-bold">
				<span className="flex items-center gap-x-2">
					{formatProductPrice(1299)}{" "}
					<TagIcon
						strokeWidth={strokeWidth}
						className="w-5 h-5 text-teal-500"
					/>
				</span>
			</div>
		</div>
	);
};

export default SearchCourseCard;
