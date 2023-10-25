import { UserButton } from "@clerk/nextjs";
import React from "react";
import { MobileSidebar } from "@/components/sidebar/mobile-sidebar";

const TeacherNavbar = () => {
	return (
		<div className="p-4 border-b h-full flex items-center justify-between md:justify-end bg-white  shadow-sm">
			<MobileSidebar />
			<UserButton afterSignOutUrl="/" />
		</div>
	);
};

export default TeacherNavbar;
