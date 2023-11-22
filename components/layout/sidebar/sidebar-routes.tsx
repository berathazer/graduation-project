"use client";

import {
	BadgePlus,
	BarChart,
	Compass,
	Layout,
	List,
	MenuSquare,
	ShieldCheck,
	UserCog,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";

const adminRoutes = [
	{
		icon: ShieldCheck,
		label: "Admin",
		href: "/admin",
	},
	{
		icon: MenuSquare,
		label: "Kategoriler",
		href: "/admin/categories",
	},
];

const teacherRoutes = [
	{
		icon: UserCog,
		label: "Profil",
		href: "/teacher",
	},
	{
		icon: List,
		label: "Kurslarım",
		href: "/teacher/courses",
	},
	{
		icon: BadgePlus,
		label: "Kurs Oluştur",
		href: "/teacher/create",
	},
	{
		icon: BarChart,
		label: "Analitikler",
		href: "/teacher/analytics",
	},
];

export const SidebarRoutes = () => {
	const pathname = usePathname();

	const isTeacherPage = pathname?.includes("/teacher");

	const routes = isTeacherPage ? teacherRoutes : adminRoutes;

	return (
		<div className="flex flex-col w-full">
			{routes.map((route) => (
				<SidebarItem
					key={route.href}
					icon={route.icon}
					label={route.label}
					href={route.href}
				/>
			))}
		</div>
	);
};
