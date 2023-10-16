import React from "react";
import Logo from "public/logo.svg";
import Image from "next/image";
const NavbarLogo = () => {
	return (
		<div className="hidden md:flex items-center relative w-36 h-full text-xl font-bold">
			{/* <Image
				alt="logo"
				src={Logo}
				fill
			/> */}
			OE-Platform
		</div>
	);
};

export default NavbarLogo;
