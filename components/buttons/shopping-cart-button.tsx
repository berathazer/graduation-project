import React from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";

const ShoppingCartButton = () => {
	return (
		<TooltipProvider delayDuration={50}>
			<Tooltip >
				<TooltipTrigger asChild>
					<Link
						href={"/cart"}
						className="relative mr-2"
					>
						<ShoppingCart className="w-5 h-5  font-bold cursor-pointer hover:opacity-75 transition" />

						{/* Sepetteki ürün sayısı alınarak gösterilcek!*/}
						<Badge
							variant={"circle"}
							className="absolute text-[10px] -top-3 -right-2"
						>
							2
						</Badge>
					</Link>
				</TooltipTrigger>
				<TooltipContent>
					{/* Sepette Ürün Yoksa Bu Kısım Gösterilecek */}
					<div className="flex flex-col py-4 px-6 gap-y-4 text-center ">
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
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default ShoppingCartButton;
