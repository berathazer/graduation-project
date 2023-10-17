"use client";
import AnimateSVG from "public/animate.svg";
import Image from "next/image";

// @ts-ignore
import animationData from "public/animation.json";
import Lottie from "lottie-react";

import React from "react";

const BrandAnimation = () => {
	return (
		<div className="relative py-8 md:py-0 bg-slate-50 md:bg-white flex items-center justify-center md:flex md:items-start md:justify-start">
			<Lottie
				animationData={animationData}
				className="h-[320px] md:h-[370px] lg:h-[400px] xl:h-[420px] md:absolute md:right-6 lg:right-12 xl:right-20"
			/>
		</div>
	);
};

export default BrandAnimation;
