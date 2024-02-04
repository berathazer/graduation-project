import React, { Suspense } from "react";

import { SignedIn, UserButton, auth } from "@clerk/nextjs";

import Link from "next/link";
import ShoppingCartButton from "@/components/buttons/shopping-cart-button";

import MobileSearchButton from "@/components/buttons/mobile-search-button";

import LoginButton from "@/components/buttons/login-button";
import RegisterButton from "@/components/buttons/register-button";

import { cn } from "@/lib/utils";

import NotificationButton from "@/components/buttons/notification-button";
import { Button } from "@/components/ui/button";
import FavoritesButton from "@/components/buttons/favorites-button";
import db from "@/lib/db";
import { Profile } from "@prisma/client";

import { cookies } from "next/headers";
import { Skeleton } from "@/components/ui/skeleton";
import MyCoursesButton from "@/components/buttons/my-courses-button";

export const admin_routes = [
	{
		url: "/admin",
		name: "Öğretmen Modu",
		tooltip: true,
		component: (
			<Link href={"/admin"}>
				<Button size={"sm"}>Admin Modu</Button>
			</Link>
		),
	},
];
export const teacher_routes = [
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

export const student_routes = [
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

export const public_routes = [
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
	const isAdmin = profile?.role === "ADMIN";
	const isAuthenticated = profile != null && userId != null;

	const basketCookie = cookies().get("basket")?.value;
	const basketIds = basketCookie ? JSON.parse(basketCookie) : [];

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
		orderBy: {
			createdAt: "asc",
		},
	});

	const [favorites, basket] = await Promise.all([
		getFavorites,
		isAuthenticated ? getBasketFromDB : getBasketFromIds,
	]);

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
				{!isAdmin &&
					routes.map((route, index) => {
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
				{isAdmin &&
					admin_routes.map((route, index) => {
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

				{userId && <MyCoursesButton />}
				{/* {userId && <NotificationButton />} */}
				{/* Aktif kullanıcı bilgilerini gösteren buton */}
				<SignedIn>
					<Suspense fallback={<Skeleton className="w-8 h-8 rounded-full" />}>
						<UserButton afterSignOutUrl="/" />
					</Suspense>
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
