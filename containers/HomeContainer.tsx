import { CardContent, CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card";
import Image from "next/image";

import PopularCategories from "@/components/home/popular-categories";
import MainBrand from "@/components/home/main-brand";
import PopularCourses, { PopularCoursesSkeleton } from "@/components/home/popular-courses";
import { Suspense } from "react";
import Higlights from "@/components/home/higlights";

const HomeContainer = async () => {
	return (
		<main className="w-full min-h-without_navbar flex flex-col gap-y-4 ">
			{/*Main Brand */}
			<MainBrand />
			{/*Popüler Kategoriler */}
			<PopularCategories />

			{/* Popüler Kurslar */}
			<Suspense fallback={<PopularCoursesSkeleton />}>
				<PopularCourses />
			</Suspense>

			{/* Öne Çıkan Özellikler */}
			<Higlights />

			{/* Yorumlar */}
			<section className="w-full py-16 flex flex-col gap-y-6 px-4 md:px-60">
				<p className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-gray-500 to-gray-900 py-6 text-center">
					Topluluktan Güncel Yorumlar
				</p>

				<div className="grid w-full  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>

					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>

					<div className="max-w-lg mx-auto  rounded-sm shadow-offset-black ">
						<Card className="p-6 font-poppins ">
							<CardContent className="text-lg relative text-black/80 pt-4">
								<svg
									className=" absolute -top-0 left-0 text-20xl text-muted-foreground"
									fill="none"
									height="24"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									width="24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
									<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
								</svg>
								{
									"Generating a testimonial card component with a prompt-driven interface is pretty cool... Well done, Vercel!"
								}
							</CardContent>
							<CardHeader className="pt-0">
								<div className="flex items-center">
									<Image
										alt="John Doe's Avatar"
										className="mr-2 rounded-full"
										height="40"
										src="https://github.com/shadcn.png"
										style={{
											aspectRatio: "40/40",
											objectFit: "cover",
										}}
										width="40"
									/>
									<div>
										<CardTitle className="text-base">John Doe</CardTitle>
										<CardDescription>CEO, Example Corp.</CardDescription>
									</div>
								</div>
							</CardHeader>
						</Card>
					</div>
				</div>
			</section>
		</main>
	);
};

export default HomeContainer;
