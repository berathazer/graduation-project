import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const StudentNavbar = () => {
	return (
		<div className="  h-full w-full flex items-center justify-end bg-white  gap-x-4 ">
			<Link href={"/"}>
				<Button
					variant={"ghost"}
					className="text-xs"
				>
					<LogOut /> Çıkış Yap
				</Button>
			</Link>
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default StudentNavbar;
