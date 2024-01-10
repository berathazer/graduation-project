import { strokeWidth } from "@/lib/constant";
import { BellIcon, PlayCircleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyCoursesButton = () => {
	return (
		<Link href={"/my-courses"} className="flex lg:hidden">
			<PlayCircleIcon
				strokeWidth={strokeWidth}
				className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition "
			/>
		</Link>
	);
};

export default MyCoursesButton;
