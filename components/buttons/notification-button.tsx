import { strokeWidth } from "@/lib/constant";
import { BellIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotificationButton = () => {
	return (
		<Link href={"/notifications"}>
			<BellIcon
				strokeWidth={strokeWidth}
				className="w-5 h-5 font-bold cursor-pointer hover:opacity-75 transition"
			/>
		</Link>
	);
};

export default NotificationButton;
