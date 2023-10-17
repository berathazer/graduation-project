import React from "react";
import ModeToggle from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";

import Link from "next/link";
import ShoppingCartButton from "../buttons/shopping-cart-button";
import { currentProfile } from "@/lib/auth";
import MobileSearchButton from "../buttons/mobile-search-button";

import LoginButton from "../buttons/login-button";
import RegisterButton from "../buttons/register-button";
import CategoriesTooltip from "../tooltips/categories-tooltip";

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

const public_routes = [
	{
		url: "/courses",
		name: "Kurslar",
	},
	{
		url: "/categories",
		name: "Kategoriler",
		tooltip: true,
		component: <CategoriesTooltip />,
	},
];

const NavbarRoutes = async () => {
	const user = await currentProfile();

	return (
		<div className="flex items-center gap-x-2 ml-auto">
			<div
				id="navbarRoutes"
				className=" hidden lg:flex items-center gap-x-6 mr-6 text-sm "
			>
				{user
					? user_routes.map((route, index) => (
							<Link
								href={route.url}
								key={index}
							>
								{route.name}
							</Link>
					  ))
					: public_routes.map((route, index) => {
							if (!route.tooltip) {
								return (
									<Link
										href={route.url}
										key={index}
									>
										{route.name}
									</Link>
								);
							}

							return <div key={index}>{route.component}</div>;
					  })}
			</div>

			<div className="flex items-center gap-x-3">
				{/* Sepet Butonu */}
				<ShoppingCartButton />
				{/* Mobil Arama Butonu */}
				<MobileSearchButton />
				{/* Tema değiştirme butonu */}
				{/* <ModeToggle /> */}
				{/* Aktif kullanıcı bilgilerini gösteren buton */}
				{user && <UserButton afterSignOutUrl="/" />}
				{!user && (
					<>
						<LoginButton />
						<RegisterButton />
					</>
				)}
			</div>
		</div>
	);
};

export default NavbarRoutes;
