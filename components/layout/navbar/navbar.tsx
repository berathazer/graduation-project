import React from "react";
import MobileSidebar from "./mobile-sidebar";
import NavbarRoutes from "./navbar-routes";
import NavbarLogo from "./navbar-logo";
import NavbarSearch from "./navbar-search";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CategoriesTooltip from "../../tooltips/categories-tooltip";
import db from "@/lib/db";
import { currentProfile } from "@/lib/auth";

interface NavbarProps {}
const Navbar = async ({}: NavbarProps) => {
	const getProfile = currentProfile();
	const getCategories = db.category.findMany();
	const [profile, categories] = await Promise.all([getProfile, getCategories]);

	return (
		<>
			{/* <Alert
				variant={"info"}
				className="text-center"
			>
				<AlertTitle className="font-bold">Yeni öğrencilere özel teklif</AlertTitle>
				<AlertDescription>
					Kurslar şimdi yalnızca <span className="font-bold">₺69,99</span>
					{"'"}den başlayan fiyatlarla! İndirimleri görmek için düğmeye tıklayın. Kalan süre:
					<span className="font-bold"> 4 sa 11 dak 49 sn.</span>
				</AlertDescription>
			</Alert> */}
			<Alert
				variant={"info"}
				className="text-center"
			>
				<AlertTitle className="font-bold">
					Adminlerin eklediği özel teklifler burda gözükecek
				</AlertTitle>
				<AlertDescription>
					Kurslar şimdi yalnızca <span className="font-bold">₺69,99</span>
					{"'"}den başlayan fiyatlarla! İndirimleri görmek için düğmeye tıklayın.
				</AlertDescription>
			</Alert>

			<nav className="w-full h-[72px] dark:bg-slate-950 flex items-center shadow-sm border-b px-4 md:px-8 transition-colors">
				<NavbarLogo />
				<CategoriesTooltip categories={categories} />
				<MobileSidebar
					categories={categories}
					role={profile?.role}
				/>
				<NavbarSearch categories={categories} />
				<NavbarRoutes profile={profile} />
			</nav>
		</>
	);
};

export default Navbar;
