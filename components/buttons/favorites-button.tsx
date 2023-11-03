import { HeartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { Favorite } from "@prisma/client";

interface FavoritesButtonProps {
	favorites: Favorite[];
}
const FavoritesButton = ({ favorites }: FavoritesButtonProps) => {
	return (
		<Link
			href={"/favorites"}
			className="relative"
		>
			<HeartIcon className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition" />
			<Badge
				variant={"circle"}
				className="absolute text-[9px] -top-3 -right-2 hover:bg-black"
			>
				{favorites.length}
			</Badge>
		</Link>
	);
};

export default FavoritesButton;
