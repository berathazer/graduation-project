"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import NodeJs from "public/courses/node-js-course.png";
const LoadingImage = ({
	title,
	imageUrl,
	className,
}: {
	title: string;
	imageUrl?: string;
	className?: string;
}) => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div
			className={cn(
				"w-full rounded-md flex-1 bg-slate-50 border relative overflow-hidden",
				className
			)}
		>
			<Image
				alt={title}
				src={imageUrl || NodeJs}
				fill
				priority
				className={cn(
					"duration-500 ease-in-out object-fill",
					isLoading ? "scale-150 blur-lg" : ""
				)}
				onLoadingComplete={() => setIsLoading(false)}
			/>
		</div>
	);
};

export default LoadingImage;
