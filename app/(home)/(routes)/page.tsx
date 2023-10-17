import MainBrandCard from "@/components/main-brand-card";

import BrandAnimation from "@/components/brand-animation";
export default async function Home() {
	return (
		<main className="w-full min-h-without_navbar flex flex-col gap-y-4 ">
			<section
				id="mainBrand"
				className="w-full  lg:px-16 h-[308px] md:h-[340px] lg:h-[378px] flex flex-col"
			>
				<div className="w-full h-full relative bg-slate-50">
					{/*  */}
					<BrandAnimation />

					<div className="md:w-[300px] lg:w-[350px] xl:w-[380px] border-none md:flex bg-white md:absolute md:top-10 lg:top-14 xl:top-16 md:left-8 lg:left-12 xl:left-20 transition">
						<MainBrandCard className=" md:w-[300px] lg:w-[350px] xl:w-[380px] shadow-md border rounded-none relative bottom-5 md:bottom-0" />
					</div>
				</div>
			</section>
		</main>
	);
}
