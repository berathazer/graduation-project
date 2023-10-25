import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const TeacherNavbar = () => {
	return (
		<div className="p-4 border-b h-full flex items-center justify-between md:justify-end bg-white  shadow-sm gap-x-4 px-8">
			<MobileSidebar />
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

export default TeacherNavbar;
