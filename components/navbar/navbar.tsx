import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";
import NavbarLogo from "./navbar-logo";
import NavbarSearch from "./navbar-search";

const Navbar = () => {
	return (
		<nav className="w-full h-[72px]  bg-slate-50 dark:bg-[#2b2d31] flex items-center md:justify-between shadow-md px-4 md:px-8 transition-colors">
			<NavbarLogo />
			<MobileSidebar />
			<NavbarSearch />
			<NavbarRoutes />
		</nav>
	);
};

export default Navbar;
