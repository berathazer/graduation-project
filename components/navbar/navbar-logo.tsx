import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
import Link from "next/link";
const NavbarLogo = () => {
	return (
		<Link
			href={"/"}
			className="hidden md:flex items-center relative w-36 h-full text-2xl font-bold"
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
