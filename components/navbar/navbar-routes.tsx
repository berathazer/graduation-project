import React from "react";

import { SignedIn, UserButton, auth } from "@clerk/nextjs";

import Link from "next/link";
import ShoppingCartButton from "../buttons/shopping-cart-button";

import MobileSearchButton from "../buttons/mobile-search-button";

import LoginButton from "../buttons/login-button";
import RegisterButton from "../buttons/register-button";

import { cn } from "@/lib/utils";

import NotificationButton from "../buttons/notification-button";
import { Button } from "../ui/button";
import FavoritesButton from "../buttons/favorites-button";
import db from "@/lib/db";
import { Basket, Course, Favorite, Profile } from "@prisma/client";
import { getBasketFromCookies } from "@/lib/basket";
import { cookies } from "next/headers";

const teacher_routes = [
	{
		url: "/my-courses",
		name: "Kurslarım",
		tooltip: false,
		component: false,
	},
	{
		url: "/teacher",
		name: "Öğretmen Modu",
		tooltip: true,
		component: (
			<Link href={"/teacher/courses"}>
				<Button size={"sm"}>Öğretmen Modu</Button>
			</Link>
		),
	},
];

const student_routes = [
	{
		url: "/instructor",
		name: "Eğitmen Ol",
		tooltip: false,
		component: false,
	},
	{
		url: "/courses",
		name: "Tüm Kurslar",
		tooltip: false,
		component: false,
	},
	{
		url: "/my-courses",
		name: "Kurslarım",
		tooltip: false,
		component: false,
	},
];

const public_routes = [
	{
		url: "/instructor",
		name: "Eğitmen Ol",
		tooltip: false,
		component: false,
	},
	{
		url: "/courses",
		name: "Kurslar",
		tooltip: false,
		component: false,
	},
];

interface NavbarRoutesProps {
	profile: Profile | null;
}

const NavbarRoutes = async ({ profile }: NavbarRoutesProps) => {
	const { userId } = auth();
	const isTeacher = profile?.role === "TEACHER";
	const isAuthenticated = profile != null && userId != null;

	const basketCookie = cookies().get("basket")?.value;
	const basketIds = basketCookie ? JSON.parse(basketCookie) : null;

	const getFavorites = db.favorite.findMany({
		where: {
			profileId: profile?.id,
		},
	});

	const getBasketFromDB = db.basket.findMany({
		where: {
			profileId: profile?.id || "",
		},
		include: {
			course: true,
		},
	});
	const getBasketFromIds = db.course.findMany({
		where: {
			id: {
				in: basketIds,
			},
		},
	});

	const [favorites, basket] = await Promise.all([
		getFavorites,
		isAuthenticated ? getBasketFromDB : getBasketFromIds,
	]);
	//console.log("isAuthenticated:", isAuthenticated, "basket:", basket);
	let routes;

	if (!isTeacher) {
		routes = student_routes;
	} else {
		routes = teacher_routes;
	}

	if (!userId) {
		routes = public_routes;
	}
	return (
		<div className="flex items-center gap-x-2 ml-auto">
			<div
				id="navbarRoutes"
				className={cn(" hidden lg:flex items-center gap-x-6 mr-6 text-sm ", userId && "mr-8")}
			>
				{routes.map((route, index) => {
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
				{userId && <FavoritesButton favorites={favorites} />}
				{/* Sepet Butonu */}
				<ShoppingCartButton basket={basket} />
				{/* Mobil Arama Butonu */}
				<MobileSearchButton />

				{userId && <NotificationButton />}
				{/* Aktif kullanıcı bilgilerini gösteren buton */}
				<SignedIn>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>

				{!userId && (
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
