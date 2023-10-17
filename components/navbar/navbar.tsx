import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";
import NavbarLogo from "./navbar-logo";
import NavbarSearch from "./navbar-search";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Navbar = () => {
	return (
		<>
			<Alert
				variant={"info"}
				className="text-center"
			>
				<AlertTitle className="font-bold">Yeni öğrencilere özel teklif</AlertTitle>
				<AlertDescription>
					Kurslar şimdi yalnızca <span className="font-bold">₺69,99</span>
					{"'"}den başlayan fiyatlarla! İndirimleri görmek için düğmeye tıklayın. Kalan süre:
					<span className="font-bold">4 sa 11 dak 49 sn.</span>
				</AlertDescription>
			</Alert>
			<nav className="w-full h-[72px] dark:bg-slate-950 flex items-center shadow-sm border-b px-4 md:px-8 transition-colors">
				<NavbarLogo />
				<MobileSidebar />
				<NavbarSearch />
				<NavbarRoutes />
			</nav>
		</>
	);
};

export default Navbar;
