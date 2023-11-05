import React from "react";

import { SignedIn, UserButton, auth } from "@clerk/nextjs";

import Link from "next/link";
import ShoppingCartButton from "../buttons/shopping-cart-button";
import { currentProfile } from "@/lib/auth";
import MobileSearchButton from "../buttons/mobile-search-button";

import LoginButton from "../buttons/login-button";
import RegisterButton from "../buttons/register-button";

import { cn } from "@/lib/utils";

import NotificationButton from "../buttons/notification-button";
import { Button } from "../ui/button";
import { checkIsTeacher } from "@/lib/teacher";
import FavoritesButton from "../buttons/favorites-button";
import db from "@/lib/db";
import { Profile } from "@prisma/client";

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
	const favorites = await db.favorite.findMany({
		where: {
			profileId: profile?.id,
		},
	});

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
				<ShoppingCartButton />
				{/* Mobil Arama Butonu */}
				<MobileSearchButton />
				{/* Tema değiştirme butonu */}
				{/* <ModeToggle /> */}

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
