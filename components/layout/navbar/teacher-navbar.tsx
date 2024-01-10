import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MobileSidebar } from "@/components/layout/sidebar/mobile-sidebar";
import { Button } from "../../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

const TeacherNavbar = () => {
	return (
		<div className="p-4 border-b h-full flex items-center justify-between md:justify-end bg-white  gap-x-4 px-8">
			<MobileSidebar />
			<div className="flex items-center gap-x-4">
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
		</div>
	);
};

export default TeacherNavbar;
