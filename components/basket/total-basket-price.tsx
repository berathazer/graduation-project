import { formatProductPrice } from "@/lib/helpers";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const TotalBasketPrice = () => {
	return (
		<div
			className="flex flex-col gap-y-2
		"
		>
			<div className="flex font-medium gap-x-2">
				<span>Toplam:</span> <p>{formatProductPrice(5456)}</p>
			</div>
			<Link
				href={"/basket"}
				className=""
			>
				<Button className="rounded-none w-full">Sepete Git</Button>
			</Link>
		</div>
	);
};

export default TotalBasketPrice;
