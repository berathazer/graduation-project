import { Button } from "@/components/ui/button";

import {
	Sheet,

	SheetContent,

	SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowDownWideNarrow } from "lucide-react";
import { SearchFilters } from "./search-filters";

function MobileFilter() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant={"ghost"}
					className=" w-max px-4 py-6  border rounded-none border-black flex lg:hidden items-center gap-x-2 "
				>
					<ArrowDownWideNarrow
						strokeWidth={2}
						className="w-4 h-4"
					/>
					<span className=" font-medium">Filtreler</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SearchFilters q={""} />
				{/* <SheetFooter>
					<SheetClose asChild>
						<Button type="submit">Filtrele</Button>
					</SheetClose>
				</SheetFooter> */}
			</SheetContent>
		</Sheet>
	);
}

export default MobileFilter;
