import NavigationBreadcrumb from "@/components/navigation-breadcrumb";
import BasketCourseCard from "@/components/students/basket/basket-course-card";
import BasketSummary from "@/components/students/basket/basket-summary";

import PageWrapper from "@/containers/PageWrapper";

import { strokeWidth } from "@/lib/constant";
import db from "@/lib/db";

import { basketNavigation } from "@/lib/navigations";
import { urls } from "@/lib/urls";
import { cn } from "@/lib/utils";
import { CourseWithFeatureWithChapters } from "@/types/global.types";
import { SignedIn, SignedOut } from "@clerk/nextjs";

import { ShoppingCart } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
interface BasketContainerProps {
	profileId: string;
}

const BasketContainer = async ({ profileId }: BasketContainerProps) => {
	const isAuthenticated = profileId != null;
	const basketCookie = cookies().get("basket")?.value;
	const basketIds = basketCookie ? JSON.parse(basketCookie) : [];

	const getBasketFromDB = db.basket.findMany({
		where: {
			profileId: profileId || "",
		},
		include: {
			course: {
				include: {
					courseFeature: true,
					chapters: true,
				},
			},
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	const getBasketFromIds = db.course.findMany({
		where: {
			id: {
				in: basketIds,
			},
		},
		include: {
			courseFeature: true,
			chapters: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	const basket = isAuthenticated ? await getBasketFromDB : await getBasketFromIds;
	let courses: CourseWithFeatureWithChapters[];
	if (isAuthenticated) {
		//@ts-ignore
		courses = basket.map((item) => item.course);
	} else {
		//@ts-ignore
		courses = basket;
	}

	return (
		<div className="min-h-without_navbar">
			<PageWrapper>
				<NavigationBreadcrumb
					title="Sepet"
					navigations={basketNavigation}
				/>

				{basket.length === 0 && (
					<div className="flex w-full flex-col gap-y-4 items-center justify-center py-8 ">
						<div className="p-6 rounded-full flex items-center justify-center bg-slate-50">
							<ShoppingCart
								strokeWidth={strokeWidth}
								className="w-10 h-10 text-muted-foreground"
							/>
						</div>
						<div className="font-semibold text-lg md:text-xl text-black/80 text-center">
							Sepetiniz şu anda boş :{"("}
						</div>
						<div className="text-muted-foreground font-light text-[.85rem] w-auto md:w-[420px] text-center ">
							Beğendiğiniz kursları sepetinize ekleyerek satın alabilirsiniz. Daha fazla
							kurs aramak için{" "}
							<Link
								href={urls.courses}
								className="underline"
							>
								tıklayın.
							</Link>
						</div>
					</div>
				)}

				{basket.length > 0 && (
					<div className="flex flex-col md:flex-row gap-x-2 h-full gap-y-12">
						<div className="flex flex-1 flex-col pt-4 gap-y-4">
							{basket.map((item, index) => (
								<div
									key={item.id}
									className={cn(
										"flex",
										index !== basket.length - 1 && " pb-4 border-b"
									)}
								>
									<SignedIn>
										<BasketCourseCard
											key={item.id}
											//@ts-ignore
											course={item.course}
											isAuthenticated={isAuthenticated}
											basketId={item.id}
										/>
									</SignedIn>

									<SignedOut>
										<BasketCourseCard
											key={item.id}
											//@ts-ignore
											course={item}
											isAuthenticated={isAuthenticated}
										/>
									</SignedOut>
								</div>
							))}
						</div>
						<BasketSummary
							courses={courses}
							isAuthenticated={isAuthenticated}
						/>
					</div>
				)}
			</PageWrapper>
		</div>
	);
};

export default BasketContainer;
