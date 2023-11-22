import TeacherNavbar from "@/components/layout/navbar/teacher-navbar";
import { Sidebar } from "@/components/layout/sidebar/sidebar";
import { checkIsAdmin } from "@/lib/admin";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
	const { userId } = auth();
	const isAdmin = await checkIsAdmin(userId);
	if (!isAdmin) {
		return redirect("/");
	}

	return (
		<div className="h-full">
			<div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
				<TeacherNavbar />
			</div>
			<div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
				<Sidebar />
			</div>
			<main className="md:pl-56 pt-[80px] h-full">{children}</main>
		</div>
	);
};

export default AdminLayout;
