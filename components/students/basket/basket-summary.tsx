import CompleteOrderButton from "@/components/buttons/complete-order-button";
import { Button } from "@/components/ui/button";
import { formatProductPrice } from "@/lib/helpers";
import { CourseWithFeatureWithChapters } from "@/types/global.types";

import Link from "next/link";
import React from "react";

interface BasketSummaryProps {
	courses: CourseWithFeatureWithChapters[];
	isAuthenticated: boolean;
}
const BasketSummary = ({ courses, isAuthenticated }: BasketSummaryProps) => {
	const totalBasketPrice = courses.reduce((total, course) => total + course.price!, 0);

	return (
		<div className=" border md:w-80 flex flex-col  p-6 gap-y-6">
			<p className="text-black/80">SEPET ÖZETİ</p>
			<p className="text-[.87rem] text-black/60">
				Ödeme işlemlerinizde verileriniz her zaman koruma altında.
			</p>
			<div className="flex flex-col gap-y-2">
				<span className="text-sm text-muted-foreground">Sepet Toplam Fiyatı:</span>
				<span className="text-xl font-black text-black/70">
					{formatProductPrice(totalBasketPrice)}
				</span>
			</div>

			<div className="flex mt-auto flex-col gap-y-4">
				<CompleteOrderButton />
				<Link href={"/"}>
					<Button
						variant={"outline"}
						className="rounded-none w-full"
					>
						Alışverişe Devam Et
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default BasketSummary;
