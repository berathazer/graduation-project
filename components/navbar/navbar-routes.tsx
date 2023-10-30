import React from "react";

import { UserButton } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";

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
		url: "/courses",
		name: "Kurslar",
		tooltip: false,
		component: false,
	},
	{
		url: "/courses",
		name: "student",
		tooltip: false,
		component: false,
	},
];

const public_routes = [
	{
		url: "/courses",
		name: "Kurslar",
		tooltip: false,
		component: false,
	},
	{
		url: "/courses",
		name: "public",
		tooltip: false,
		component: false,
	},
];

const NavbarRoutes = async () => {
	const profile = await currentProfile();

	const isTeacher = await checkIsTeacher(profile?.userId);

	let routes;

	if (!isTeacher) {
		routes = student_routes;
	} else {
		routes = teacher_routes;
	}

	if (!profile) {
		routes = public_routes;
	}



	return (
		<div className="flex items-center gap-x-2 ml-auto">
			<div
				id="navbarRoutes"
				className={cn(" hidden lg:flex items-center gap-x-6 mr-6 text-sm ", profile && "mr-8")}
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
				{/* {isTeacher &&
					teacher_routes.map((route, index) => {
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

				{!isTeacher &&
					student_routes.map((route, index) => {
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
					})} */}
			</div>

			<div className="flex items-center gap-x-3">
				{profile && (
					<Link href={"/favorites"}>
						<HeartIcon className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition" />
					</Link>
				)}
				{/* Sepet Butonu */}
				<ShoppingCartButton />
				{/* Mobil Arama Butonu */}
				<MobileSearchButton />
				{/* Tema değiştirme butonu */}
				{/* <ModeToggle /> */}

				{profile && <NotificationButton />}
				{/* Aktif kullanıcı bilgilerini gösteren buton */}
				{profile && <UserButton afterSignOutUrl="/" />}
				{!profile && (
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
