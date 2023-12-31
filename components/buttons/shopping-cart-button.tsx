"use client";
import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { strokeWidth } from "@/lib/constant";
import { Basket, Course } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ShoppingCourseCard from "../shopping-course.card";
import { Separator } from "../ui/separator";
import TotalBasketPrice from "../students/basket/total-basket-price";
import { ScrollArea } from "../ui/scroll-area";

type BasketWithCourse = Basket & {
	course: Course;
};

interface ShoppingCartButtonProps {
	basket: BasketWithCourse[] | Course[];
}

const ShoppingCartButton = ({ basket }: ShoppingCartButtonProps) => {
	const { isLoaded, isSignedIn } = useAuth();
	let totalBasketPrice = 0;

	if (isLoaded && isSignedIn) {
		//@ts-ignore
		totalBasketPrice = basket.reduce((total, item) => total + item.course.price, 0);
	} else {
		//@ts-ignore
		totalBasketPrice = basket.reduce((total, item) => total + item.price, 0);
	}

	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip>
				<TooltipTrigger asChild>
					<Link
						href={"/basket"}
						className="relative"
					>
						<ShoppingCart
							strokeWidth={strokeWidth}
							className="w-5 h-5  font-bold cursor-pointer hover:opacity-75 transition"
						/>

						{/* Sepetteki ürün sayısı alınarak gösterilcek!*/}
						{basket.length > 0 && (
							<Badge
								variant={"circle"}
								className="absolute text-[9px] -top-3 -right-2 hover:bg-black"
							>
								{basket.length}
							</Badge>
						)}
					</Link>
				</TooltipTrigger>
				<TooltipContent
					className="mt-[22px] relative right-8 p-0   border rounded-none"
					side="bottom"
				>
					{/* Sepette Ürün Yoksa Bu Kısım Gösterilecek */}
					<div className="flex flex-col  gap-y-4 text-center  ">
						{basket.length === 0 ? (
							<div className="p-4 flex flex-col gap-y-4">
								<Badge
									variant="secondary"
									className="flex items-center justify-center py-2"
								>
									Sepetiniz Boş
								</Badge>
								<Link
									href={"/"}
									className="text-xs font-bold underline"
								>
									Alışverişe Devam Et
								</Link>
							</div>
						) : (
							<>
								<ScrollArea className="max-h-72 px-4 flex flex-col ">
									<SignedOut>
										{basket.map((item, index) => (
											<ShoppingCourseCard
												key={item.id}
												//@ts-ignore
												course={item}
												isLastItem={basket.length - 1 === index}
											/>
										))}
									</SignedOut>

									<SignedIn>
										{basket.map((item, index) => (
											<ShoppingCourseCard
												key={item.id}
												//@ts-ignore
												course={item.course}
												isLastItem={basket.length - 1 === index}
											/>
										))}
									</SignedIn>
								</ScrollArea>
								<Separator />
								<TotalBasketPrice total={totalBasketPrice} />
							</>
						)}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ShoppingCartButton;
