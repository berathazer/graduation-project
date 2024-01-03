import React from "react";
import MainBrandCard from "../main-brand-card";
import BrandAnimation from "../brand-animation";

const MainBrand = () => {
	return (
		<section
			id="mainBrand"
			className="w-full md:h-[480px] lg:[540px] xl:h-without_navbar lg:px-16  bg-slate-50  flex gap-x-4 lg:py-16"
		>
			<div className="flex-1 flex items-center justify-center px-4 lg:px-0">
				<MainBrandCard className="bg-slate-50 border-none shadow-none" />
			</div>

			<BrandAnimation />
		</section>
	);
};

export default MainBrand;
