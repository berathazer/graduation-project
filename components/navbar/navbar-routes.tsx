import React from "react";
import ModeToggle from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { BellIcon, HeartIcon, Search, ShoppingCart } from "lucide-react";

import Link from "next/link";
import ShoppingCartButton from "../buttons/shopping-cart-button";

const user_routes = [
	{
		url: "/my-courses",
		name: "Kurslarım",
	},

	/* {
		url: "/notifications",
		name: <BellIcon className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition" />,
	}, */
	{
		url: "/favorites",
		name: <HeartIcon className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition" />,
	},
];

const NavbarRoutes = () => {
	return (
		<div className="flex items-center gap-x-2">

			<div
				id="navbarRoutes"
				className="flex items-center gap-x-2"
			>
				{user_routes.map((route, index) => (
					<Link
						href={route.url}
						key={index}
					>
						{route.name}
					</Link>
				))}
			</div>

			<div className="flex items-center gap-x-2">
				{/* Sepet Butonu */}
				<ShoppingCartButton />

				<Search className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition" />
				<ModeToggle />
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default NavbarRoutes;
