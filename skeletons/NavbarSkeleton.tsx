import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const NavbarSkeleton = () => {
	return (
		<div className="w-full flex flex-col gap-y-2">
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
			<Skeleton className="w-full h-16" />
		</div>
	);
};

export default NavbarSkeleton;
