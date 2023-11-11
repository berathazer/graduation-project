import { formatProductPrice } from "@/lib/helpers";
import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

const TotalBasketPrice = ({ total }: { total: number }) => {
	return (
		<div
			className="flex flex-col gap-y-2 px-4 pb-4
		"
		>
			<div className="flex items-center text-xl  gap-x-1">
				<span>Toplam:</span> <p className="font-bold">{formatProductPrice(total || 0)}</p>
			</div>
			<Link
				href={"/basket"}
				className=""
			>
				<Button className=" w-full">Sepete Git</Button>
			</Link>
		</div>
	);
};

export default TotalBasketPrice;
