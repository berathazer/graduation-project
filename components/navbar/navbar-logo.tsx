import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarLogoProps {
	className?: string;
}
const NavbarLogo = ({ className }: NavbarLogoProps) => {
	return (
		<Link
			href={"/"}
			className={cn(
				"hidden md:flex items-center relative w-36 h-full text-2xl font-bold",
				className
			)}
		>
			{/* <Image
				alt="logo"
				src={Logo}
				fill
			/> */}
			Ogreniyor
		</Link>
	);
};

export default NavbarLogo;
