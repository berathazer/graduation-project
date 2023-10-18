"use client";
import AnimateSVG from "public/animate.svg";
import Image from "next/image";

// @ts-ignore
import animationData from "public/animation.json";
import Lottie from "lottie-react";

import React from "react";

const BrandAnimation = () => {
	return (
		<div className="flex flex-1 items-start py-4 md:py-12 xl:py-8 2xl:py-0  ">
			<Lottie
				animationData={animationData}
				className="object-contain"
			/>
		</div>
	);
};

export default BrandAnimation;
